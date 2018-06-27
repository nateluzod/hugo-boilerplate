# Hugo Starter

Use this as a basis for new Hugo sites. This is intended to be used on Netlify and Forestry, so CI integration has been stripped from earlier version since those two services handle that now. This base utilizes Webpack via [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) and no longer relies on Gulp. 

## Important things to note:

* CSS is based on Tailwind and uses SCSS as a preprocessor. Make edits to src/scss/style.css to include new libs and one off styles. We should probably find a way to incorporate postcss so that we can `@apply` Tailwind styles, but that's not critical at this point. 
* JavaScript is minimal and structured with [Stimulus JS](https://github.com/stimulusjs/stimulus). Out of the box, we're only showing and hiding nav as a sample. [Turbolinks](https://github.com/turbolinks/turbolinks) is also in use however this should only be active on remote environments since it interferes with LiveReload. See line one of app.js for the condition that sets this. 

## To-Do
* We need to incorporate uncss into final build process.