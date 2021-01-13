// -------------------------------------------------------------------
// :: CLEAN
// -------------------------------------------------------------------
// - https://www.npmjs.com/package/del

var gulp = require('gulp');
var del = require('del');

gulp.task('clean:tmp', function () {
    return del(['.tmp']);
});

gulp.task('clean:dist', function () {
    return del(['dist']);
});

gulp.task('clean:docs', function () {
    return del(['docs']);
});

gulp.task('clean:aws', function () {
    return del([
        'dist/*',
        '!dist/aws'
    ]);
});
