import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from 'rollup-plugin-json';
import uglify from "rollup-plugin-uglify";

export default [
  {
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
  },
  {
    input: "src/js/search.js",
    output: {
      file: "static/search.js",
      format: "cjs"
    },
    watch: {
      include: ""
    },
    treeshake: false,
    plugins: [
      json({
        preferConst: true        
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  },  
]