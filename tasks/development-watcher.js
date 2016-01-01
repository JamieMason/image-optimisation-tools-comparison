'use strict';

var gulp = require('gulp');

gulp.task('development-watcher', ['build'], function() {
    return gulp.watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/**/*.scss'
    ], [
        'build'
    ]);
});
