'use strict';

var path = require('path');
var deferred = require('deferred');

var terminal = require('./terminal');
var OptimisedImage = require('./optimisedimage');
var directory = path.resolve(__dirname + '/../images');

/**
 * @description
 * Returns a collection of models representing each image in the /images
 * directory.
 *
 * @return {OptimisedImageGroup}
 */
exports.get = function() {
    return terminal.findAllImages(directory)
        .then(function(paths) {
            return paths.map(OptimisedImage.create);
        })
        .then(function(results) {
            return results.reduce(function(memo, img) {
                memo.imagesByTool[img.tool] = memo.imagesByTool[img.tool] || [];
                memo.imagesByTool[img.tool].push(img);
                memo.imagesByName[img.name] = memo.imagesByName[img.name] || [];
                memo.imagesByName[img.name].push(img);
                memo.imagesByToolByName[img.tool] = memo.imagesByToolByName[img.tool] || {};
                memo.imagesByToolByName[img.tool][img.name] = img;
                memo.imagesByNameByTool[img.name] = memo.imagesByNameByTool[img.name] || {};
                memo.imagesByNameByTool[img.name][img.tool] = img;
                return memo;
            }, {
                images: results,
                imagesByTool: {},
                imagesByName: {},
                imagesByToolByName: {},
                imagesByNameByTool: {}
            });
        });
};

/**
 * @description
 * Gather the statistical quality loss for each image in the /images directory
 * compared to the original in /images/photoshop and reference in /image/worst.
 *
 * @param {OptimisedImageGroup} results
 * @return {Promise}
 */
exports.setLoss = function(results) {
    var measureImages = deferred.map(
        results.images,
        deferred.gate(function(result) {
            var original = results.imagesByToolByName.photoshop[result.name];
            return result.compareTo(original);
        }, 50)
    );
    return measureImages().then(function() {
        return results;
    });
};

/**
 * @description
 * Gather the file size for each image in the /images directory.
 *
 * @param {OptimisedImageGroup} results
 * @return {Promise}
 */
exports.setSize = function(results) {
    var measureImages = deferred.map(
        results.images,
        deferred.gate(function(result) {
            return result.setFileSize();
        }, 50)
    );
    return measureImages().then(function() {
        return results;
    });
};

/**
 * @description
 * Gather what percentage of each file's size was removed, how many bytes were
 * removed, and what percentage of the maximum possible quality loss was
 * incurred as a result.
 *
 * @param {OptimisedImageGroup} results
 * @return {OptimisedImageGroup}
 */
exports.setDifferences = function(results) {
    results.images.forEach(function(result) {
        var original = results.imagesByToolByName.photoshop[result.name];
        var worst = results.imagesByToolByName.worst[result.name];
        result.sizeSaving = original.size - result.size;
        result.sizeSavingPercent = (result.sizeSaving / original.size) * 100;
        result.qualityLossPercent = 0;
        if (worst && result.meanErrorSquared) {
            result.qualityLossPercent = (result.meanErrorSquared / worst.meanErrorSquared) * 100;
        }
        result.score = result.sizeSavingPercent - (result.qualityLossPercent * 2);
        result.lossy = result.sizeSaving > 0 && result.qualityLossPercent > 0;
    });
    return results;
};

/**
 * @description
 * Clean up any temporary data needed when gathering statistics.
 *
 * @param  {OptimisedImageGroup} results
 * @return {OptimisedImageGroup}
 */
exports.finish = function(results) {
    results.images.forEach(function(result) {
        result.finish();
    });
    return results;
};
