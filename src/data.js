'use strict';

var fs = require('fs');
var deferred = require('deferred');
var images = require('./images');
var readFile = deferred.promisify(fs.readFile);
var writeFile = deferred.promisify(fs.writeFile);

/**
 * @description
 * Read the named JSON file in directory and write it's contents to the named
 * member of results.
 *
 * @inner
 * @param  {String} directory
 * @param  {Object} results
 * @param  {String} name
 * @return {Promise}
 */
function read(directory, results, name) {
    return readFile(directory + name + '.json')
        .then(function(str) {
            var json = JSON.parse(str);
            results[name] = json;
            return json;
        });
}

/**
 * @description
 * Write the named member of results to the named JSON file in directory.
 *
 * @inner
 * @param  {String} directory
 * @param  {Object} results
 * @param  {String} name
 * @return {Promise}
 */
function write(directory, results, name) {
    return writeFile(
        directory + name + '.json',
        JSON.stringify(results[name], null, 2)
    );
}

/**
 * @description
 * Read the results of a previously run test whose results were written to the
 * given directory.
 *
 * @param  {String} directory
 * @return {Promise}
 */
module.exports.read = function(directory) {
    var results = {};
    var reader = read.bind(null, directory, results);
    return deferred
        .map([
            reader('images'),
            reader('imagesByTool'),
            reader('imagesByName'),
            reader('imagesByToolByName'),
            reader('imagesByNameByTool')
        ])
        .then(function() {
            return results;
        });
};

/**
 * @description
 * Write the provided results of a previously run test to the given directory.
 *
 * @param  {String} directory
 * @param  {Object} results
 * @return {Promise}
 */
module.exports.write = function(directory, results) {
    var writer = write.bind(null, directory, results);
    return deferred
        .map([
            writer('images'),
            writer('imagesByTool'),
            writer('imagesByName'),
            writer('imagesByToolByName'),
            writer('imagesByNameByTool')
        ])
        .then(function() {
            return results;
        });
};

/**
 * @description
 * Inspect the file size and quality loss of each file in the images directory.
 *
 * @return {Promise}
 */
module.exports.gather = function() {
    return images.get()
        .then(images.setSize)
        .then(images.setLoss)
        .then(images.setDifferences)
        .then(images.finish);
};
