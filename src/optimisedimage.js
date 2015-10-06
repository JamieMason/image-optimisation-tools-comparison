'use strict';

var terminal = require('./terminal');

/**
 * @description
 * Create a model to represent an image used in the test.
 *
 * @class OptimisedImage OptimisedImage
 * @param {String} location
 */
function OptimisedImage(location) {

    var paths = location.split(/\\|\//);

    this._path = location;

    /**
     * @description
     * eg. "filename.jpg".
     *
     * @property {String}
     */
    this.name = paths.pop();

    /**
     * @description
     * eg. "ImageOptim".
     *
     * @property {String}
     */
    this.tool = paths.pop();

    /**
     * @description
     * eg. "gif", "jpeg-colour-profile", "png24-interlaced", "png8".
     *
     * @property {String}
     */
    this.type = this.name.split('_')[0];

    /**
     * @description
     * Result of http://www.imagemagick.org/script/compare.php when compared
     * against the Photoshop original, using the MSE metric.
     *
     * @property {Number}
     */
    this.meanErrorSquared = -1;

    /**
     * @description
     * 0% is lossless and 100% is the worst quality possible for this image.
     *
     * @property {Number}
     */
    this.qualityLossPercent = -1;

    /**
     * @description
     * File size in bytes of the image.
     *
     * @property {Number}
     */
    this.size = -1;

    /**
     * @description
     * Number of bytes removed from the original Photoshop image.
     *
     * @property {Number}
     */
    this.sizeSaving = -1;

    /**
     * @description
     * Percentage of the original Photoshop image's size that was removed.
     *
     * @property {Number}
     */
    this.sizeSavingPercent = -1;

    /**
     * @description
     * Score awarded for quality/loss trade-off.
     *
     * @property {Number}
     */
    this.score = -1;

    /**
     * @description
     * Whether any quality loss was incurred.
     *
     * @property {Boolean}
     */
    this.lossy = null;

}

/**
 * @description
 * Returns a promise for when .size has been set.
 *
 * @return {Promise}
 */
OptimisedImage.prototype.setFileSize = function() {
    return terminal.getFileSize(this._path)
        .then(function(result) {
            this.size = result;
            console.log('%s: %s == %s bytes', this.tool, this.name, this.size);
            return this;
        }.bind(this));
};

/**
 * @description
 * Returns a promise for when .meanErrorSquared has been set.
 *
 * @param  {OptimisedImage} original
 * @return {Promise}
 */
OptimisedImage.prototype.compareTo = function(original) {
    return terminal.getQualityLoss(original._path, this._path)
        .then(function(result) {
            this.meanErrorSquared = result;
            console.log('%s: %s == %s loss', this.tool, this.name, this.meanErrorSquared);
            return this;
        }.bind(this));
};

/**
 * @description
 * Clean up temporary data needed when gathering statistics.
 *
 * @return {OptimisedImage}
 */
OptimisedImage.prototype.finish = function() {
    delete this._path;
    return this;
};

/**
 * @description
 * Factory Method to create a new instance of OptimisedImage.
 *
 * @param  {String} location
 * @return {OptimisedImage}
 */
exports.create = function(location) {
    return new OptimisedImage(location);
};
