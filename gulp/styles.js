// -------------------------------------------------------------------
// :: SASS
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-sass
// - https://www.npmjs.org/package/gulp-merge-media-queries
// - https://www.npmjs.org/package/gulp-autoprefixer
// - https://www.npmjs.com/package/gulp-postcss
// - https://www.npmjs.com/package/autoprefixer
// - https://www.npmjs.com/package/cssnano
// - https://www.npmjs.com/package/gulp-css-url-adjuster

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var mergeMediaQueries = require('gulp-merge-media-queries');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var rename = require('gulp-rename');
var cssUrlAdjuster = require('gulp-css-url-adjuster');
var license = require('gulp-header-license');
var fs = require('fs');

var cssNano = [
    cssnano()
];

var autoPrefixer = [
    autoprefixer({ browsers: ["last 3 versions"] })
];

var sassOptions = {
    outputStyle: 'expanded',
    sourceComments: false,
    includePaths: [
        './node_modules'
    ]
}

var sourcemapOptions = {
    includeContent: false
};

gulp.task('sass', function () {

    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(mergeMediaQueries({ use_external: false }))
        .pipe(postcss(autoPrefixer))
        .pipe(gulp.dest('.tmp/styles'));
});


// -------------------------------------------------------------------
// :: SASS DIST
// -------------------------------------------------------------------

gulp.task('sass-dist', function(){

    return gulp.src(['src/styles/**/*.scss', '!src/styles/**/styleguide.scss'])
        .pipe(plumber())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(mergeMediaQueries({ use_external: false }))
        .pipe(postcss(autoPrefixer))
        .pipe(cssUrlAdjuster({
            replace:  ['../../fonts','assets/fonts'],
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(postcss(cssNano))
        .pipe(license('/*\n' + fs.readFileSync('LICENSE.md', 'utf8') + '*/'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write("./", sourcemapOptions))
        .pipe(gulp.dest('dist'));
});


// -------------------------------------------------------------------
// :: SASS LINT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-sass-lint

var sassLint = require('gulp-sass-lint');

gulp.task('sass-lint', function () {

    return gulp.src([
            'src/styles/**/*.scss',
            '!src/styles/quarks/_quarks.mixins.scss',
            '!src/styles/base/_base.normalize.scss'
        ])
        .pipe(sassLint({
            configFile: "./.sass-lint.yml",
            options: {
                'merge-default-rules': true
            }
        }))
        .pipe(sassLint.format());

});
