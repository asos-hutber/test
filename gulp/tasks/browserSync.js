var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('browserSync', ['build'], function () {
	browserSync({
		server: {
		  // src is included for use with sass source maps
		  baseDir: ['app/www']
		},
		port: 4000,
		files: [
			// Only reload when the style.css has been built.
			"./app/www/css/style.css",
			//reload for any images changed in public
			"./app/www/img/**",
			//refresh once we have finished building views.min.js
			"./app/www/js/app.js",
			// Exclude sourcemap files
			"!public/css/*.map"
		]
	});
});
