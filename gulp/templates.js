// -------------------------------------------------------------------
// :: TEMPLATING
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-nunjucks

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var glob = require('glob');
var listSelectors = require('list-selectors');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var sassVars = require('sass-vars-to-js');

gulp.task('render-templates', function () {

    return gulp.src([
        'src/**/index.njk'
    ])
    .pipe(plumber())
    .pipe(nunjucks.compile(getTemplateData()))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest('.tmp'));

});

function getTemplateData(){
	var data = {
        ICONS: []
    };

    data.VERSION_INFO = JSON.parse(require('fs').readFileSync('package.json', 'utf8'));
	data.COLORS = stripDefaults(sassVars('node_modules/@a-ui/core/dist/assets/styles/quarks/_quarks.colors.scss'));
    data.VARIABLES = sassVars('src/styles/quarks/_quarks.variables.scss');

    var icons = glob.sync("node_modules/@a-ui/core/dist/assets/icons/*.svg");
	for(var i in icons) {
		var filename = icons[i].split('/');
		filename = filename[filename.length-1];
		filename = filename.split('.')[0];
		data.ICONS.push(filename);
	}

    listSelectors(['node_modules/@a-ui/core/dist/assets/styles//utilities/_utilities.background.scss'],
        { include: ['classes'] },
        function(bgUtilities) {
            for(var bgU in bgUtilities['classes']) {
                bgUtilities['classes'][bgU] = bgUtilities['classes'][bgU].substring(1);
            }
            data.BGUTILITIES = bgUtilities['classes'];
        }
    );

    listSelectors(['node_modules/@a-ui/core/dist/assets/styles/utilities/_utilities.spacing.scss'],
        { include: ['classes'] },
        function(spacingUtilities) {
            for(var spU in spacingUtilities['classes']) {
                spacingUtilities['classes'][spU] = spacingUtilities['classes'][spU].substring(1);
            }
            data.SPACINGUTILITIES = spacingUtilities['classes'];
        }
    );

    listSelectors(['node_modules/@a-ui/core/dist/assets/styles/utilities/_utilities.typography.scss'],
        { include: ['classes'] },
        function(textUtilities) {
            for(var txtU in textUtilities['classes']) {
                textUtilities['classes'][txtU] = textUtilities['classes'][txtU].substring(1);
            }
            data.TEXTUTILITIES = textUtilities['classes'];
        }
    );

    return data;

}

function stripDefaults(values) {
    var response = {};

    Object.keys(values).forEach(function(key) {
        if(values[key].indexOf(" !default") !== -1 && key.indexOf("instagram") === -1) {
            response[key] = values[key].replace(' !default', '');
        }
        // console.log(colors[key])
    });

    return response;
}
