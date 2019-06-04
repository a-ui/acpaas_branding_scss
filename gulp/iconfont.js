// -------------------------------------------------------------------
// :: ICONFONT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-imagemin
// - https://www.npmjs.org/package/gulp-iconfont
// - https://www.npmjs.org/package/gulp-consolidate
// - https://www.npmjs.org/package/lodash
// - https://www.npmjs.org/package/gulp-rename

var gulp = require('gulp');

var imagemin = require('gulp-imagemin'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    rename = require('gulp-rename');

gulp.task('icon-font', function() {

    var fontName = 'Antwerpen_Icons';

    // Set svg-sources, optimize svg
    // and start creating the font

    return gulp.src('src/icons/*.svg')
        .pipe(imagemin())
        .pipe(iconfont({

            // Set file-name for the font and append
            // codepoints so we always have the same
            // CSS codes (eg. content: '\e001')

            fontName: fontName,
            appendCodePoints: true,
            formats: ['woff', 'ttf', 'eot', 'svg']

        })).on('glyphs', function(glyphs, options) {
            // Create the _antwerp-icons-template.scss file based
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
