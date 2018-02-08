'use strict';

// General
import concat from "gulp-concat"
import gulp from "gulp"
import path from 'path'
import watch from 'gulp-watch'
import htmlmin from 'gulp-htmlmin'
import uncss from 'gulp-uncss'

var runSequence = require('run-sequence')
var $ = require("gulp-load-plugins")()

// Hugo
import hugoBin from "hugo-bin"
import { spawn } from "child_process"

// Post/CSS
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import nano from 'gulp-cssnano'
import postcss from "gulp-postcss"
import tailwindcss from "tailwindcss"

// JS
import babel from "gulp-babel"
import uglify from 'gulp-uglifyjs'

const PATHS = {
  css: './src/css/*.css',
  js: './src/js/*.js',
  svg: './src/svg/*.svg'
}

// CSS
gulp.task('css', () => {
  return gulp.src(PATHS.css)
    .pipe(postcss([
      tailwindcss('./tailwind.js'),
      autoprefixer({
        browsers: ['last 1 version']
      }),
      cssnano()
    ]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./static/'))
})

// JS
gulp.task('js', () => {
  gulp.src(PATHS.js)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/'))
})

// svg
gulp.task("svg", ()=> {
  const svgs = gulp.src(PATHS.svg)
    .pipe($.svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
    }))
    .pipe($.svgstore())
    .pipe(gulp.dest('./static/')) 
});

// 0_0
gulp.task('watch', () => {
  gulp.watch(PATHS.css, ['css'])
  gulp.watch(PATHS.js, ['js'])
  gulp.watch(PATHS.svg, ['svg'])
});

// ¯\_(ツ)_/¯
gulp.task('default', ['watch'])

// Base URL
let baseURL = process.env.BASE_URL ||  "/";

// Hugo arguments
const hugoArgsDefault = [
  "--baseURL",
  baseURL,
  "-d",
  "./dist",
  "-s",
  "./"
];

// Minify HTML
gulp.task("htmlmin", () => {
  return gulp.src(["./dist/*.html", "./dist/**/*.html"])
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  }))
  .pipe(gulp.dest("./dist"));
});

// Remove unused CSS classes
gulp.task("uncss", () => {
  return gulp.src('./dist/style.css')
    .pipe(uncss({
      html: [
        './dist/*.html',
        './dist/**/*.html',
        './dist/**/**/*.html'
      ],
      ignore: [
        '.turbolinks-progress-bar'
      ]
    }))
    .pipe(gulp.dest('./dist/'))
})

// Build site in /dist
gulp.task("hugo", cb => {
  buildSite(cb, [], "production")
    .on("error", cb)
    .on("close", cb);
});

// Build/production tasks
gulp.task('build', function() {
  runSequence('css', 'hugo', 'htmlmin', 'uncss');
});

// Run hugo and build the site
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;
  process.env.NODE_ENV = environment;
  return spawn(hugoBin, args, { stdio: "inherit" });
}