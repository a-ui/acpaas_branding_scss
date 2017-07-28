// -------------------------------------------------------------------
// :: GIT
// -------------------------------------------------------------------
// - https://www.npmjs.com/package/gulp-git

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var git = require('gulp-git');
var fileSystem = require('fs');

gulp.task('git', function() {
    var nodePackageFile = JSON.parse(fileSystem.readFileSync('./package.json'));
    var version = nodePackageFile.version;

    return gulp.src(['./dist/*', './bower.json', './package.json'])
        .pipe(git.add())
        .pipe(git.commit('Release v' + version));
});

gulp.task('git-tag', function() {
    var nodePackageFile = JSON.parse(fileSystem.readFileSync('./package.json'));
    var version = nodePackageFile.version;

    git.tag('v' + version, 'Release v' + version, function (err) {
        if (err) throw err;
    });
});
