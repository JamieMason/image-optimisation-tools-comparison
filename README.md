# image-optimisation-tools-comparison

> A Benchmarking Suite for popular Image Optimisation Tools

[![NPM version](http://img.shields.io/npm/v/image-optimisation-tools-comparison.svg?style=flat-square)](https://www.npmjs.com/package/image-optimisation-tools-comparison)
[![NPM downloads](http://img.shields.io/npm/dm/image-optimisation-tools-comparison.svg?style=flat-square)](https://www.npmjs.com/package/image-optimisation-tools-comparison)
[![Build Status](http://img.shields.io/travis/JamieMason/image-optimisation-tools-comparison/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/image-optimisation-tools-comparison)
[![Maintainability](https://api.codeclimate.com/v1/badges/a470dd5c2957de2ede65/maintainability)](https://codeclimate.com/github/JamieMason/image-optimisation-tools-comparison/maintainability)
[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/image-optimisation-tools-comparison)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/image-optimisation-tools-comparison?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## ☁️ Installation

```
npm install image-optimisation-tools-comparison
```

## 📋 Usage

There are no runtime dependencies, `getResults()` parses and returns
[`results.json`](./src/data/results.json).

```ts
import { getResults } from 'image-optimisation-tools-comparison';

const array = getResults();
```

## ⚙️ Contributing

The [pyssim](https://github.com/jterrace/pyssim) Python module is used to compute the **Structural
Similarity Image Metric** (SSIM). It can be installed on Mac using `brew install python` then
`pip install pyssim`.

The original, unoptimised images are located in [`/images/photoshop`](./images/photoshop). Each time
a tool is tested, its directory (eg. [`/images/codekit`](./images/codekit)) is replaced with the
original images from [`/images/photoshop`](./images/photoshop), the tool is then run over the images
to update the benchmark.

[`/images/worst`](./images/worst) is a copy of the original images at
[`/images/photoshop`](./images/photoshop) which is then compressed to the worst possible image
quality. This value lets us calculate the quality loss percentage for each image.

Each time the [`/images`](./images) directory changes,
[`/src/data/results.json`](./src/data/results.json) needs to be updated using `yarn update-results`.

These images used are exported from a .psd kindly given to us by
[Daan Jobsis](http://www.twitter.com./daanjobsis) from his tests carried out for the article [Retina
Revolution: Follow Up](http://blog.netvlies.nl/design-interactie /retina-revolutie-follow-up/),
containing photographs of varying levels of detail, simple patterns, and logos.

The images are exported using "Save for Web" as;

- GIF (+Interlaced).
- JPEG (+Optimised, Progressive).
- PNG 8 (+Interlaced).
- PNG 24 (+Interlaced).

## Manual Steps

- [`/images/codekit`](./images/codekit) is compressed using https://incident57.com/codekit/.
- [`/images/kraken`](./images/kraken) is uploaded using the File Uploader at
  https://kraken.io/web-interface. The Zip file is then downloaded and extracted into this
  directory.
- [`/images/smushit`](./images/smushit) is uploaded one-by-one using the Uploader view at
  http://www.smushit.com/ysmush.it. The Zip file is then downloaded and extracted into this
  directory.
- [`/images/tinypng`](./images/tinypng) is uploaded in batches of 20 at a time using the uploader at
  https://tinypng.com, downloaded one-by-one then moved into this directory.

## :raising_hand: Get Help

There are few ways to get help:

1.  For bug reports and feature requests, open issues :bug:
1.  For direct and quick help, you can use Gitter :rocket:
