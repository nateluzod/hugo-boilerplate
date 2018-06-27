if (process.env.NODE_ENV === "production" && !isSafari) {
  var Turbolinks = require("turbolinks")
  Turbolinks.start()
} 

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import domready from "domready"

// IE11 Support
import svg4everybody from "svg4everybody"
import picturefill from "picturefill"
import "core-js/fn/array/find"
import "core-js/fn/array/find-index"
import "core-js/fn/array/from"
import "core-js/fn/map"
import "core-js/fn/object/assign"
import "core-js/fn/promise"
import "core-js/fn/set"
import "element-closest"
import "mutation-observer-inner-html-shim"


const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
svg4everybody()
picturefill()