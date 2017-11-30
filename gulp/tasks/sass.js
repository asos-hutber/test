var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

//libsass
gulp.task('sass', function () {
	return gulp.src('./dev/sass/style.scss')
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(sourcemaps.init())
		//.pipe(autoprefixer())
		.pipe(sass())
		//.pipe(minifyCSS())
		.pipe(sourcemaps.write('./app/www/css'))
		.on('error', handleErrors)
		.pipe(gulp.dest('./app/www/css'))
});
