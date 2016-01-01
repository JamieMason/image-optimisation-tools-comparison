'use strict';

var gulp = require('gulp');

gulp.task('copy', function() {
    gulp.src('src/css/**/*.*')
        .pipe(gulp.dest('dist/css'));
});
