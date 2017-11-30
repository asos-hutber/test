var path = require("path");
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var config = require("./config");

gulp.task("test", function (cb) {
	gulp.src(path.join(config.dir.js, config.glob.js))
		.pipe(plugins.plumber())
		.pipe(plugins.istanbul({
			includeUntested: true
		}))
		.pipe(plugins.istanbul.hookRequire())
		.on("finish", function () {
			gulp.src(path.join(config.dir.test, config.glob.test), { read: false })
				.pipe(plugins.plumber())
				.pipe(plugins.mocha({ reporter: "spec" }))
				.pipe(plugins.istanbul.writeReports({
					dir: config.dir.coverage,
					reportOpts: { dir: config.dir.coverage },
					reporters: ["text-summary", "html"]
				}))
				.pipe(plugins.plumber.stop())
				.on("end", cb)
		})
		.pipe(plugins.plumber.stop());
});
