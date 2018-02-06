import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/js/head.js",
  output: {
    file: "static/head.js",
    format: "cjs"
  },
  watch: {
    include: ""
  },
  treeshake: false,
  plugins: [
    resolve(),
    commonjs(),
    uglify()
  ]
};