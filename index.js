'use strict';

module.exports = {
    getImages: getImages,
    getImagesByName: getImagesByName,
    getImagesByNameByTool: getImagesByNameByTool,
    getImagesByTool: getImagesByTool,
    getImagesByToolByName: getImagesByToolByName,
    run: run
};

function getImages() {
    return require('./results/images.json');
}

function getImagesByName() {
    return require('./results/imagesByName.json');
}

function getImagesByNameByTool() {
    return require('./results/imagesByNameByTool.json');
}

function getImagesByTool() {
    return require('./results/imagesByTool.json');
}

function getImagesByToolByName() {
    return require('./results/imagesByToolByName.json');
}

/**
 * @description
 * Regenerate results based on the most recent files in the images directory,
 * gather the file size, quality loss, and score for each file.
 *
 * @return {Promise}
 */
function run(options) {
    var data = require('./src/data');
    return data.gather().then(
        data.write.bind(null, options.outputDirectory)
    );
}
