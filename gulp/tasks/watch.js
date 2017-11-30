/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function () {
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
	gulp.watch('./dev/js/**/*.js', ['browserify']);
	gulp.watch('./dev/jade/**/*.jade', ['browserify']);
	gulp.watch('./dev/img/**', ['images']);
});
