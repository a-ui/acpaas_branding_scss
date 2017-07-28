// -------------------------------------------------------------------
// :: CLEAN
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-clean

var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {

    return gulp.src([
        '.tmp'
    ], { read: false })
        .pipe(clean());
});

gulp.task('clean-dist', function () {

    return gulp.src([
        'dist'
    ], { read: false })
        .pipe(clean());
});

gulp.task('clean-docs', function () {

    return gulp.src([
        'docs'
    ], { read: false })
        .pipe(clean());
});
