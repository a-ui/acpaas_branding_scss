// -------------------------------------------------------------------
// :: GULP ICONFONT
// -------------------------------------------------------------------
// Note: creation of the icon font is a stand-alone
// task and should be performed before running the
// server or build task
//
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-imagemin
// - https://www.npmjs.org/package/gulp-iconfont
// - https://www.npmjs.org/package/gulp-consolidate
// - https://www.npmjs.org/package/lodash
// - https://www.npmjs.org/package/gulp-rename

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');

gulp.task('icon-font', function() {

    var fontName = 'Antwerpen_Icons';

    // Set svg-sources, optimize svg
    // and start creating the font

    return gulp.src('src/icons/*.svg')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(iconfont({

            // Set file-name for the font and append
            // codepoints so we always have the same
            // CSS codes (eg. content: '\e001')

            fontName: fontName,
            appendCodePoints: true,
            formats: ['woff', 'ttf', 'eot', 'svg']

        })).on('glyphs', function(glyphs, options) {
            // Create the __icons.scss file based
            // on the template and inject font-name
            // path and CSS class-name

            gulp.src('src/icons/_antwerp-icons-template.scss')
                .pipe(consolidate('lodash', {

                    glyphs: glyphs,
                    fontName: fontName,
                    fontPath: '../../fonts',
                    className: 'icon'

                }))
                .pipe(rename('_base.antwerpen-icons.scss'))
                .pipe(gulp.dest('src/styles/base'));

        })
        .pipe(gulp.dest('src/fonts'));
});
