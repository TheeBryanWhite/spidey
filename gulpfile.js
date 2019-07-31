const pkg = require('./package.json');
const gulp = require('gulp');
const BrowserSync = require('./gulp-tasks/browsersync');
const Sass = require('./gulp-tasks/sass');
const Scripts = require('./gulp-tasks/scripts');
const Img = require('./gulp-tasks/img-min');

gulp.task('browser-sync-init', function () {
	BrowserSync.initialize
});

gulp.task('lint', function () {
	Scripts.lint
});

gulp.task('js', 
	gulp.series('lint', gulp.parallel('lint'),
		function () {
			Scripts.build
		}
	)
);

gulp.task('js-watch',
	gulp.series('js', gulp.parallel('js'),
		function () { 
			BrowserSync.reload
		}
	)
);

gulp.task('copy', function(){
    gulp.src(`${pkg.config.src}/**/*.html`)
        .pipe(gulp.dest(pkg.config.dist));
});

gulp.task('reload-watch',
	gulp.series('copy', gulp.parallel('copy'),
		function () {
			BrowserSync.reload
		}
	)
);

gulp.task('sass', function () {
	Sass.build
});

gulp.task('imagemin', function () {
	Img.imgmin
});

gulp.task('watch', function (cb) {
	gulp.watch([`${pkg.config.scss}/**/*.scss`], function (cb) {
			['sass']
			cb();
		}
	);

	gulp.watch([`${pkg.config.scripts}/**/*.js`], function (cb) {
			['js-watch']
			cb();
		}
	);

	gulp.watch([`${pkg.config.images}/**`], function (cb) {
			['imagemin']
			cb();
		}
	);

	gulp.watch([`${pkg.config.src}/**/*.html`], function (cb) {
			['reload-watch']
			cb();
		}
	);
	
	cb();
});

gulp.task('default', function(cb) {
	[
		'sass',
		'js',
		'imagemin',
		'copy',
		'browser-sync-init',
		'watch'
	]
	cb();
});