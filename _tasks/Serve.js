import MainBuild from "./Main";
import CoreBuild from "./Core";
import FileManage from "./FileManage";

export default (_) => {
	function imageChangeTask(path, stats) {
		const fileName = path.replace(/[\/\\]/g, "/");
		const destinationPathname = fileName
			.replace("src", "_dist")
			.replace(fileName.split("/")[fileName.split("/").length - 1], "");
		_.del(fileName.replace("src", "_dist"));
		console.log(`Copy: "${fileName}"   =====>   "${destinationPathname}"`);
		return _.gulp.src(fileName).pipe(_.gulp.dest(destinationPathname));
	}

	function imageRemoveTask(path, stats) {
		const fileName = path.replace(/[\/\\]/g, "/");
		const destinationPathname = fileName.replace("src", "_dist");
		console.log(`Deleted: "${destinationPathname}"`);
		return _.del(destinationPathname);
	}

	function server() {
		_.bSync.init({
			notify: false,
			server: {
				baseDir: "_dist",
			},
			port: 8000,
		});

		_.gulp
			.watch(["src/_templates/_layout/**.pug"])
			.on("change", function () {
				return MainBuild(_).html("src/**.pug");
			});

		_.gulp.watch(["src/**.pug"]).on("change", (path, stats) => {
			const fileName = path.split("\\" || "/")[1];
			const glob = path.replace(/[\\\/]/g, "/");
			console.log(`Render file ${fileName}`);
			return MainBuild(_).html(glob);
		});

		_.gulp
			.watch([
				"src/_templates/**/**.pug",
				"!src/_templates/_layout/**.pug",
			])
			.on("change", (path, stats) => {
				const fileName = path.split("\\" || "/")[2];
				const glob = `src/${fileName}.pug`;
				console.log(`Render file ${fileName}.pug`);
				return MainBuild(_).html(glob);
			});

		_.gulp
			.watch(["src/assets/**/**.**"], {
				ignorePermissionErrors: true,
				delay: 300,
				events: "all",
			})
			.on("add", imageChangeTask)
			.on("change", imageChangeTask)
			.on("addDir", imageChangeTask)
			.on("unlink", imageRemoveTask)
			.on("unlinkDir", imageRemoveTask);

		_.gulp
			.watch([
				"src/js/main.js",
				"src/js/libraries/**.js",
				"src/js/utilities/**.js",
			])
			.on("change", function () {
				return MainBuild(_).jsBrowserify();
			});

		_.gulp
			.watch(["src/js/**.js", "!src/js/main.js"])
			.on("change", (path, stats) => {
				const glob = path.replace(/[\/\\]/g, "/");
				console.log(`Transpile file ${glob}`);
				return MainBuild(_).jsNormalBabel();
			});

		_.gulp.watch(["src/scss/**/**.scss"]).on("change", function () {
			return MainBuild(_).css("src/scss/**.scss", "!src/scss/_*.scss");
		});

		_.gulp.watch(
			["_vendors.json", "vendors/**/**.css", "vendors/**/**.js"],
			_.gulp.parallel(CoreBuild(_).css, CoreBuild(_).js),
		);

		_.gulp.watch("src/api/**/**").on("change", function (path, stats) {
			return FileManage(_).Copy("src/api/**", "_dist/api");
		});

		_.gulp
			.watch([
				"_dist/**.html",
				"_dist/css/**/**.css",
				"_dist/js/**/**.js",
				"_dist/api/**/**",
			])
			.on("change", _.bSync.reload);
	}

	return {
		server,
	};
};
