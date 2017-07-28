// VERSIONING -------------------------------------------------------------
// Keep track of the versioning of this project.
//
// - https://www.npmjs.com/package/yargs
// - https://www.npmjs.com/package/gulp-bump

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var bump = require('gulp-bump');
var yargs = require('yargs');
var fileSystem = require('fs');

gulp.task('semver', function(){

    var argv = yargs.usage('Usage: gulp release --<versionType>')
        // .example('gulp release --patch', 'updates the version with 1 patch number')
        .option('patch', {
            demand: false,
            describe: 'Patch release',
            type: 'boolean'
        })
        .option('minor', {
            demand: false,
            describe: 'Minor release',
            type: 'boolean'
        })
        .option('major', {
            demand: false,
            describe: 'Major release',
            type: 'boolean'
        })
        .help('h')
        .argv;

    var nodePackageFile = JSON.parse(fileSystem.readFileSync('./package.json'));
    var version = nodePackageFile.version;

    if (argv.patch) {
        version = 'patch'
    } else if (argv.minor) {
        version = 'minor'
    } else if (argv.major) {
        version = 'major'
    }

    // update the version

    return gulp.src('./*.json')
      .pipe(bump({
          type: version
      }))
      .pipe(gulp.dest('./'));

});
