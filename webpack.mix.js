const mix = require('laravel-mix');
require('laravel-mix-tailwind');
require('laravel-mix-svg-sprite');

mix.js([
    './src/js/app.js'
    ], 'static/bundle.js')
    .sass('./src/scss/style.scss', 'src/css/style.css')
    .tailwind()
    .svgSprite('./src/svg', 'static/sprite.svg')
    .options({
      postCss: [
        require('cssnano')({
          discardComments: {
              removeAll: true,
          },
        }),
        require('autoprefixer')({
          browsers: '>0.1%'
        })
        // require('postcss-uncss')({
        //   html: [
        //     './dist/*.html',
        //     './dist/**/*.html',
        //     './dist/**/**/*.html'
        //   ]
        // })
      ]
    });