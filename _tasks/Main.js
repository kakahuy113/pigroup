export default (_) => {
	function html(glob) {
		return _.gulp
			.src(glob)
			.pipe(
				_.plumber(function (err) {
					console.error(err.message.toString());
					this.emit("end");
				}),
			)
			.pipe(
				_.pug({
					pretty: "\t",
				}),
			)
			.pipe(_.gulp.dest("_dist"));
	}

	function css(glob) {
		return _.gulp
			.src(glob)
			.pipe(_.sourcemap.init())
			.pipe(
				_.sass({
					sync: true,
					fiber: _.Fiber,
				}).on("error", _.sass.logError),
			)
			.pipe(
				_.postcss([
					_.autoprefixer({
						cascade: false,
					}),
					_.cssSort({
						order: "smacss",
					}),
				]),
			)
			.pipe(
				_.clean({
					compatibility: "ie8",
				}),
			)
			.pipe(
				_.rename({
					suffix: ".min",
				}),
			)
			.pipe(_.sourcemap.write("."))
			.pipe(_.gulp.dest("_dist/css"));
	}

	function jsBrowserify() {
		return _.browserify({
			basedir: ".",
			entries: ["src/js/main.js"],
			debug: true,
			sourceMaps: true,
		})
			.transform(
				_.babelify.configure({
					presets: ["@babel/preset-env"],
					plugins: [
						"@babel/plugin-transform-classes",
						"@babel/plugin-transform-async-to-generator",
					],
					extensions: [".js"],
				}),
			)
			.bundle()
			.on("error", function (err) {
				console.error(err.toString());
				this.emit("end");
			})
			.pipe(_.source("main.js"))
			.pipe(_.buffer())
			.pipe(_.sourcemap.init({ loadMaps: true }))
			.pipe(_.uglifyES())
			.pipe(
				_.rename({
					suffix: ".min",
				}),
			)
			.pipe(_.sourcemap.write("."))
			.pipe(_.gulp.dest("_dist/js"));
	}

	function jsNormalBabel() {
		return _.gulp
			.src(["src/js/**.js", "!src/js/main.js"])
			.pipe(
				_.plumber(function (err) {
					console.error(err.toString());
					this.emit("end");
				}),
			)
			.pipe(_.sourcemap.init())
			.pipe(_.babel())
			.pipe(_.uglify())
			.pipe(
				_.rename({
					suffix: ".min",
				}),
			)
			.pipe(_.sourcemap.write("."))
			.pipe(_.gulp.dest("_dist/js"));
	}

	return {
		html,
		css,
		jsBrowserify,
		jsNormalBabel,
	};
};
