//* browserify task
// ---------------
// Bundle javascripty things with browserify!
//
// If the watch task is running, this uses watchify instead
// of browserify for faster bundling using caching.
// */
//

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// add custom browserify options here
var customOpts = {
	entries: ['./dev/js/app.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file
b.transform(require("jadeify"), { compileDebug: true, pretty: false });
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
	return b.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('app.js'))
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer())
		// optional, remove if you dont want sourcemaps
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		// Add transformation tasks to the pipeline here.
		.pipe(sourcemaps.write('./app/www')) // writes .map file
		.pipe(gulp.dest('./app/www/js'));
}