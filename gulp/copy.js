// -------------------------------------------------------------------
// :: COPY
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-rename
// - https://www.npmjs.com/package/gulp-replace
// - https://www.npmjs.com/package/merge-stream

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var merge = require('merge-stream');

gulp.task('copy', function() {

    var fontsStream = gulp.src('src/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/fonts'));

    var stylesStream = gulp.src(['src/styles/**/*', '!src/styles/**/styleguide.scss'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/styles'));

    var imagesStream = gulp.src('src/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/images'));

    return merge(fontsStream, stylesStream, imagesStream);

});

gulp.task('copy-docs', function() {

    var tmpStream = gulp.src('.tmp/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('docs'));

    var imagesStream = gulp.src('src/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('docs/images'));

    var fontsStream = gulp.src('src/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('docs/fonts'));

    return merge(tmpStream, imagesStream, fontsStream);

});

gulp.task('replace', function(){
  gulp.src(['.tmp/**/*.css'])
    .pipe(replace('../../', '../'))
    .pipe(gulp.dest('docs'));
});
