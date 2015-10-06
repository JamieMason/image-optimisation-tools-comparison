'use strict';

var process = require('deferred').promisify(require('child_process').exec);

/**
 * @description
 * Returns a promise for a {String[]} containing the absolue file system paths
 * to every image in the /images directory.
 *
 * @param  {String} location
 * @return {Promise}
 */
exports.findAllImages = function(location) {
    return process('find ' + location + ' -type f \\( -name "*.gif" -or -name "*.jpg" -or -name "*.png" \\) -exec echo {} \\;')
        .then(function(results) {
            return results[0].trim().split('\n');
        });
};

/**
 * @description
 * Returns a promise for a {Number} showing the size in bytes of a location on
 * the file system.
 *
 * @param  {String} location
 * @return {Promise}
 */
exports.getFileSize = function(location) {
    return process('stat -f %z ' + location)
        .then(function(result) {
            return parseInt(result[0], 10);
        });
};

// Match: "3", "3.44", or "3.44635e-05".
var reFloat = '[0-9]+\\.?[0-9]*e?\\-?[0-9]*';

// Match: 'Error: Command failed: 2.25857 (3.44635e-05)'
var reLossyComparison = new RegExp(reFloat + ' \\(' + reFloat + '\\)');

/**
 * @description
 * Extract the Mean Error Squared from the output from `compare`.
 *
 * @inner
 * @param  {String} result eg "2.25857 (3.44635e-05)"
 * @return {Number}        eg 2.25857
 */
function parseComparison(result) {
    var firstValue = result.replace(/ \(.+/, '');
    return parseFloat(firstValue, 10);
}

/**
 * @description
 * xxx.
 *
 * @param  {String} original
 * @param  {String} optimised
 * @return {Promise}
 */
exports.getQualityLoss = function(original, optimised) {
    var command = 'compare -metric MSE ' + original + ' ' + optimised + ' /dev/null';
    return process(command)
        .then(function(result) {
            return parseComparison(result[1]);
        })
        .catch(function(err) {
            // When the optimisation was not lossless, `compare` is producing
            // an error message that contains the desired result.
            var message = err.toString().trim();
            var result = message.match(reLossyComparison);
            if (!result || !result.length || !result[0].length) {
                throw new Error('Error: `' + command + '` threw "' + message + '"');
            }
            return parseComparison(result[0]);
        });
};
