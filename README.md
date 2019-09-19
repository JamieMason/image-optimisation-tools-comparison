# image-optimisation-tools-comparison

> A benchmarking suite for popular image optimisation tools.

[![NPM version](http://img.shields.io/npm/v/image-optimisation-tools-comparison.svg?style=flat-square)](https://www.npmjs.com/package/image-optimisation-tools-comparison) [![NPM downloads](http://img.shields.io/npm/dm/image-optimisation-tools-comparison.svg?style=flat-square)](https://www.npmjs.com/package/image-optimisation-tools-comparison) [![Build Status](http://img.shields.io/travis/JamieMason/image-optimisation-tools-comparison/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/image-optimisation-tools-comparison) [![Maintainability](https://api.codeclimate.com/v1/badges/a470dd5c2957de2ede65/maintainability)](https://codeclimate.com/github/JamieMason/image-optimisation-tools-comparison/maintainability)

## Table of Contents

-   [🌩 Installation](#-installation)
-   [🕹 Usage](#-usage)
-   [⚙️ Contributing](#️-contributing)
-   [🚶🏽‍♀️ Manual Steps](#♀️-manual-steps)
-   [🙋🏾‍♀️ Getting Help](#♀️-getting-help)
-   [👀 Other Projects](#-other-projects)
-   [🤓 Author](#-author)

## 🌩 Installation

    npm install image-optimisation-tools-comparison

## 🕹 Usage

There are no runtime dependencies, `getResults()` parses and returns [`results.json`](./src/data/results.json).

```ts
import { getResults } from "image-optimisation-tools-comparison";

const array = getResults();
```

## ⚙️ Contributing

The [pyssim](https://github.com/jterrace/pyssim) Python module is used to compute the **Structural Similarity Image Metric** (SSIM). It can be installed on Mac using `brew install python` then `pip install pyssim`.

The original, unoptimised images are located in [`/images/photoshop`](./images/photoshop). Each time a tool is tested, its directory (eg. [`/images/codekit`](./images/codekit)) is replaced with the original images from [`/images/photoshop`](./images/photoshop), the tool is then run over the images to update the benchmark.

[`/images/worst`](./images/worst) is a copy of the original images at [`/images/photoshop`](./images/photoshop) which is then compressed to the worst possible image quality. This value lets us calculate the quality loss percentage for each image.

Each time the [`/images`](./images) directory changes, [`/src/data/results.json`](./src/data/results.json) needs to be updated using `yarn update-results`.

These images used are exported from a .psd kindly given to us by [Daan Jobsis](http://www.twitter.com./daanjobsis) from his tests carried out for the article [Retina Revolution: Follow Up]\(<http://blog.netvlies.nl/design-interactie> /retina-revolutie-follow-up/), containing photographs of varying levels of detail, simple patterns, and logos.

The images are exported using "Save for Web" as;

-   GIF (+Interlaced).
-   JPEG (+Optimised, Progressive).
-   PNG 8 (+Interlaced).
-   PNG 24 (+Interlaced).

## 🚶🏽‍♀️ Manual Steps

-   [`/images/codekit`](./images/codekit) is compressed using <https://incident57.com/codekit/>.
-   [`/images/kraken`](./images/kraken) is uploaded using the File Uploader at <https://kraken.io/web-interface>. The Zip file is then downloaded and extracted into this directory.
-   [`/images/smushit`](./images/smushit) is uploaded one-by-one using the Uploader view at <http://www.smushit.com/ysmush.it>. The Zip file is then downloaded and extracted into this directory.
-   [`/images/tinypng`](./images/tinypng) is uploaded in batches of 20 at a time using the uploader at <https://tinypng.com>, downloaded one-by-one then moved into this directory.

## 🙋🏾‍♀️ Getting Help

Get help with issues by creating a [Bug Report] or discuss ideas by opening a [Feature Request].

[bug report]: https://github.com/JamieMason/image-optimisation-tools-comparison/issues/new?template=bug_report.md

[feature request]: https://github.com/JamieMason/image-optimisation-tools-comparison/issues/new?template=feature_request.md

## 👀 Other Projects

If you find my Open Source projects useful, please share them ❤️

-   [**add-matchers**](https://github.com/JamieMason/add-matchers)<br>Write useful test matchers compatible with Jest and Jasmine.
-   [**eslint-formatter-git-log**](https://github.com/JamieMason/eslint-formatter-git-log)<br>ESLint Formatter featuring Git Author, Date, and Hash
-   [**eslint-plugin-move-files**](https://github.com/JamieMason/eslint-plugin-move-files)<br>Move and rename files while keeping imports up to date
-   [**eslint-plugin-prefer-arrow-functions**](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions)<br>Convert functions to arrow functions
-   [**get-time-between**](https://github.com/JamieMason/get-time-between#readme)<br>Measure the amount of time during work hours between two dates
-   [**ImageOptim-CLI**](https://github.com/JamieMason/ImageOptim-CLI)<br>Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of images part of your automated build process.
-   [**is-office-hours**](https://github.com/JamieMason/is-office-hours#readme)<br>Determine whether a given date is within office hours
-   [**Jasmine-Matchers**](https://github.com/JamieMason/Jasmine-Matchers)<br>Write Beautiful Specs with Custom Matchers
-   [**jest-fail-on-console-reporter**](https://github.com/JamieMason/jest-fail-on-console-reporter#readme)<br>Disallow untested console output produced during tests
-   [**karma-benchmark**](https://github.com/JamieMason/karma-benchmark)<br>Run Benchmark.js over multiple Browsers, with CI compatible output
-   [**karma-jasmine-matchers**](https://github.com/JamieMason/karma-jasmine-matchers)<br>A Karma plugin - Additional matchers for the Jasmine BDD JavaScript testing library.
-   [**logservable**](https://github.com/JamieMason/logservable)<br>git log as an observable stream of JSON objects
-   [**self-help**](https://github.com/JamieMason/self-help#readme)<br>Interactive Q&A Guides for Web and the Command Line
-   [**syncpack**](https://github.com/JamieMason/syncpack#readme)<br>Manage multiple package.json files, such as in Lerna Monorepos and Yarn Workspaces

## 🤓 Author

<img src="https://www.gravatar.com/avatar/acdf106ce071806278438d8c354adec8?s=100" align="left">

I'm [Jamie Mason] from [Leeds] in England, I began Web Design and Development in 1999 and have been Contracting and offering Consultancy as Fold Left Ltd since 2012. Who I've worked with includes [Sky Sports], [Sky Bet], [Sky Poker], The [Premier League], [William Hill], [Shell], [Betfair], and Football Clubs including [Leeds United], [Spurs], [West Ham], [Arsenal], and more.

<div align="center">

[![Follow JamieMason on GitHub][github badge]][github]      [![Follow fold_left on Twitter][twitter badge]][twitter]

</div>

<!-- images -->

[github badge]: https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow

[twitter badge]: https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow

<!-- links -->

[arsenal]: https://www.arsenal.com

[betfair]: https://www.betfair.com

[github]: https://github.com/JamieMason

[jamie mason]: https://www.linkedin.com/in/jamiemasonleeds

[leeds united]: https://www.leedsunited.com/

[leeds]: https://www.instagram.com/visitleeds

[premier league]: https://www.premierleague.com

[shell]: https://www.shell.com

[sky bet]: https://www.skybet.com

[sky poker]: https://www.skypoker.com

[sky sports]: https://www.skysports.com

[spurs]: https://www.tottenhamhotspur.com

[twitter]: https://twitter.com/fold_left

[west ham]: https://www.whufc.com

[william hill]: https://www.williamhill.com
