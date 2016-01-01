'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var options = {
    debug: true
};

gulp.task('browserify', function() {
    browserify('./src/app/index.js', options)
        .transform('reactify')
        .bundle()
        .on('error', handleError)
        .pipe(source('app/index.js'))
        .pipe(gulp.dest('dist'));
});

function handleError(error) {
    console.error(error.toString());
    this.emit('end');
}
