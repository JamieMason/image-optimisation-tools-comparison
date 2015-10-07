# image-optimisation-tools-comparison

A benchmarking suite for popular image optimisation tools.



## Using the results data

Install this project via npm

```bash
npm install image-optimisation-tools-comparison
```

The results JSON can be accessed as follows;

```javascript
var comparison = require('image-optimisation-tools-comparison');

var array = comparison.getImages();
var groupedByName = comparison.getImagesByName();
var groupedByNameByTool = comparison.getImagesByNameByTool();
var groupedByTool = comparison.getImagesByTool();
var groupedByToolByName = comparison.getImagesByToolByName();
```

## Generated data

Every result is in the following format.

```json
{
    "name": "jpeg-optimised_bril.jpg",
    "tool": "imageoptim",
    "type": "jpeg-optimised",
    "meanErrorSquared": 0,
    "qualityLossPercent": 0,
    "size": 85704,
    "sizeSaving": 5178,
    "sizeSavingPercent": 5.697497854360599,
    "score": 5.697497854360599,
    "lossy": false
}
```


## Dependencies

### ImageMagick

This project uses [`compare`](http://www.imagemagick.org/script/compare.php)
from [ImageMagick](http://www.imagemagick.org/), so you will need to have that
installed.

If you encounter errors related to `dyld library not loaded`, this is also
related to your environment and installation of ImageMagick and will need
resolving before you are ready to begin.


## Reference images

### images/photoshop

These are exported from a .psd kindly given to us by [Daan
Jobsis](http://www.twitter.com./daanjobsis) from his tests carried out for the
article [Retina Revolution: Follow Up](http://blog.netvlies.nl/design-interactie
/retina-revolutie-follow-up/), containing photographs of varying levels of
detail, simple patterns, and logos.

The images are exported using "Save for Web" as;

+ GIF (+Interlaced).
+ JPEG (+Optimised, Progressive).
+ PNG 8 (+Interlaced).
+ PNG 24 (+Interlaced).

### images/worst

This directory starts as a copy of `images/photoshop` which is then compressed
to the worst possible image quality. This value lets us calculate the quality
loss percentage for each image.


## Optimised images

All directories start as a copy of `images/photoshop` which is then;

### images/codekit

Compressed using https://incident57.com/codekit/.

### images/grunt-contrib-imagemin

Compressed using `grunt imagemin`.

### images/imagealpha-and-imageoptim

Compressed using `grunt imageoptim:imageAlphaAndImageOptim`.

### images/imageoptim

Compressed using `grunt imageoptim:ImageOptimAlone`.

### images/jpegmini-and-imageoptim

Compressed using `grunt imageoptim:jpegMiniAndImageOptim`.

### images/kraken

Uploaded using the File Uploader at https://kraken.io/web-interface. The Zip
file is then downloaded and extracted into this directory.

### images/smushit

Uploaded one-by-one using the Uploader view at http://www.smushit.com/ysmush.it.
The Zip file is then downloaded and extracted into this directory.

### images/tinypng

Uploaded in batches of 20 at a time using the uploader at https://tinypng.com,
downloaded one-by-one then moved into this directory.

