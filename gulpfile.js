'use strict';

var gulp = require('gulp');

var build = require('./gulp/build'),
    clean = require('./gulp/clean'),
    copy = require('./gulp/copy'),
    iconfont = require('./gulp/iconfont'),
    styles = require('./gulp/styles'),
    templates = require('./gulp/templates'),
    watch = require('./gulp/watch');

// Start a development server
gulp.task('server', gulp.series('clean:tmp', gulp.parallel('icon-font', 'sass', 'render-templates', 'sass-lint'), 'watch'));

// Create a build
gulp.task('build', gulp.series('clean:dist', gulp.parallel('icon-font', 'sass:dist'), 'copy'));

// Build documentation
gulp.task('docs', gulp.series('clean:docs', gulp.parallel('icon-font', 'sass', 'render-templates', 'readme'), 'copy:docs', 'replace'));

// Run aws task: publish to CDN
gulp.task('aws', gulp.series('build', 'copy:aws', 'clean:aws', 'cdn'));

// Default task
gulp.task('default', gulp.series('server'));
