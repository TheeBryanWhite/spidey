var pkg = require('../package.json'),
	gulp = require('gulp')
	svgSprite = require('gulp-svg-sprite'),
	plumber = require('gulp-plumber'),

config = {
	shape: {
		dimension: {
			maxWidth:  64,
			maxHeight: 64
		},
		spacing: {
			padding: 10
		},
		dest: '../dist/assets/svg'
	},
	mode: {
	symbol: { // symbol mode to build the SVG
		render: {
			css: false, // CSS output option for icon sizing
			scss: false // SCSS output option for icon sizing
		},
		dest: 'sprite', // destination folder
		prefix: '.svg--%s', // BEM-style prefix if styles rendered
		sprite: 'sprite.svg', //generated sprite name
		example: true // Build a sample page, please!
		}
	}
};

const build = function() {
	console.log('building sprites');
	return gulp.src(`${pkg.config.src}/**/*.svg`)
	.pipe(svgSprite( config ))
		.on('error', function(err){
			console.error(err.message);
            this.emit('end');
		})
	.pipe(gulp.dest('out'));
}

module.exports = { build };