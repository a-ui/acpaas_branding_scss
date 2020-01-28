// -------------------------------------------------------------------
// :: SASS
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-sass
// - https://www.npmjs.org/package/gulp-merge-media-queries
// - https://www.npmjs.com/package/gulp-sourcemaps
// - https://www.npmjs.com/package/gulp-postcss
// - https://www.npmjs.com/package/autoprefixer
// - https://www.npmjs.com/package/cssnano
// - https://www.npmjs.com/package/gulp-rename
// - https://www.npmjs.com/package/gulp-css-url-adjuster
// - https://www.npmjs.com/package/gulp-header-license
// - https://www.npmjs.org/package/gulp-sass-lint

var gulp = require('gulp');
var fs = require('fs');

var sass = require('gulp-sass'),
    mergeMediaQueries = require('gulp-merge-media-queries'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    rename = require('gulp-rename'),
    cssUrlAdjuster = require('gulp-css-url-adjuster'),
    license = require('gulp-header-license'),
    sassLint = require('gulp-sass-lint');


var cssNano = [
    cssnano({
        discardComments: {
            removeAllButFirst: true
        },
        discardUnused: false
    })
];

var autoPrefixer = [
    autoprefixer({ browsers: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"] })
];

var sassOptions = {
    includePaths: ['node_modules'],
    outputStyle: 'expanded',
    sourceComments: false
}

var sourcemapOptions = {
    includeContent: false
};

gulp.task('sass', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(mergeMediaQueries({ use_external: false }))
        .pipe(postcss(autoPrefixer))
        .pipe(gulp.dest('.tmp/styles'));
});


// -------------------------------------------------------------------
// :: SASS DIST
// -------------------------------------------------------------------

gulp.task('sass:dist', function(){

    // Get package version to generate correct font url
    var nodePackageFile = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
    var nodePackageVersion = nodePackageFile.version;
    var nodePackageDescription = nodePackageFile.description;

    return gulp.src(['src/styles/**/*.scss', '!src/styles/**/styleguide.scss'])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(mergeMediaQueries({ use_external: false }))
        .pipe(postcss(autoPrefixer))
        .pipe(license('/*\n' + fs.readFileSync('LICENSE.md', 'utf8') + '*/'))
        .pipe(cssUrlAdjuster({
            replace:  ['../../fonts', 'assets/fonts'],
            prepend: 'https:///cdn.antwerpen.be/' + nodePackageDescription + '/' + nodePackageVersion + '/'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(postcss(cssNano))
        .pipe(license('/*\n' + fs.readFileSync('LICENSE.md', 'utf8') + '*/'))
        .pipe(sourcemaps.write("./", sourcemapOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass-lint', function () {

    return gulp.src(['src/styles/**/*.scss'])
        .pipe(sassLint({
            configFile: "./.sass-lint.yml",
            options: {
                'merge-default-rules': true
            }
        }))
        .pipe(sassLint.format());

});
