// -------------------------------------------------------------------
// :: GULP CONFIGURATION
// -------------------------------------------------------------------


// -------------------------------------------------------------------
// :: COMMON TASKS
// -------------------------------------------------------------------
//
// - gulp: defaults to 'gulp server' and opens it in the browser

'use strict';

var gulp = require('gulp');
var fileSystem = require('fs');

var clean = require('./gulp/clean'),
    copy = require('./gulp/copy'),
    iconfont = require('./gulp/iconfont'),
    git = require('./gulp/git'),
    semver = require('./gulp/semver'),
    server = require('./gulp/server'),
    styles = require('./gulp/styles'),
    templates = require('./gulp/templates');

var run = require('run-sequence').use(gulp);


// -------------------------------------------------------------------
// :: GULP DEFAULT
// -------------------------------------------------------------------

// Default task = run server
gulp.task('default', ['server']);

gulp.task('build', ['clean-dist'], function(callback) {
    run(['icon-font', 'sass-dist', 'copy'], function() {
        callback();
    });
});

gulp.task('build-docs', ['clean-docs'], function(callback) {
    run(['icon-font', 'sass', 'render-templates', 'sass-dist', 'copy'], function() {
        callback();
    });
});

gulp.task('bump', ['build'], function(callback) {
    run(['semver'], 'git', function() {
        callback();
    });
});

gulp.task('docs', ['build-docs'], function(callback) {
    run(['copy-docs', 'replace'], function() {
        callback();
    });
});

gulp.task('release', ['bump'], function(callback) {
    run(['git-tag'], function() {
        var nodePackageFile = JSON.parse(fileSystem.readFileSync('./package.json'));
        var version = nodePackageFile.version;
        console.log('\n----++++ Version ' + version + ' is ready to be pushed! ++++----\n');
        callback();
    });
});

gulp.task('travis', ['build'], function (callback) {
    run(['cdn'], function() {
        callback();
    });
});

gulp.task('cdn', ['copy-travis'], function (callback) {
    run(['clean-travis'], function() {
        var nodePackageFile = JSON.parse(fileSystem.readFileSync('./package.json'));
        var version = nodePackageFile.version;

        fileSystem.rename('dist/travis', 'dist/' + version, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('\n----++++ https://cdn.antwerpen.be/acpaas_branding_scss/' + version + '/main.min.css ++++----\n');
                callback();
            }
        });
    });
});


// Alias for build task
gulp.task('package', ['build']);
