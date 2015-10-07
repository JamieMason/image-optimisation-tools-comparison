'use strict';

module.exports = {
    getImages: getImages,
    getImagesByName: getImagesByName,
    getImagesByNameByTool: getImagesByNameByTool,
    getImagesByTool: getImagesByTool,
    getImagesByToolByName: getImagesByToolByName
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
