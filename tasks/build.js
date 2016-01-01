'use strict';

var gulp = require('gulp');

gulp.task('build', [
    'browserify',
    'sass',
    'copy'
]);
