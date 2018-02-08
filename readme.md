[![Build Status](https://travis-ci.org/nateluzod/hugo-boilerplate.svg?branch=master)](https://travis-ci.org/nateluzod/hugo-boilerplate)

# Travis and S3
* `AWS_ACCESS_KEY_ID`
* `AWS_BUCKET_NAME`
* `AWS_REGION`
* `AWS_SECRET_ACCESS_KEY`
* `HUGO_ENV` (must be set to `production` in Travis for prod-specific scripts)

# CSS
CSS utility classes are added via [Tailwind](https://tailwindcss.com/). Add colors, fonts and more to tailwind.js. Because unmodified Tailwind produces a 200kb file, be sure to pare down colors and other things that will go unused. Also, be sure to utilize uncss to clean out unused classes from the final build. 