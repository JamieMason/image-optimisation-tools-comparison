'use strict';

run({
    outputDirectory: __dirname + '/results/'
});

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
