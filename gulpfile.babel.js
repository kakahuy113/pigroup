import gulp from "gulp";
import del from "del";
import concat from "gulp-concat";
import clean from "gulp-clean-css";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";
import sourcemap from "gulp-sourcemaps";
import stripComment from "gulp-strip-comments";
import uglify from "gulp-uglify";
import uglifyES from "gulp-uglify-es";
import sass from "gulp-sass";
import rename from "gulp-rename";
import Fiber from "fibers";
import plumber from "gulp-plumber";
import babel from "gulp-babel";
import babelify from "babelify";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";
import pug from "gulp-pug";
import bSync from "browser-sync";
import { readFileSync } from "graceful-fs";

// Import task functions
import FileManage from "./_tasks/FileManage";
import CoreBuild from "./_tasks/Core";
import MainBuild from "./_tasks/Main";
import Serve from "./_tasks/Serve";
//
// Define packages
const _ = {
	gulp,
	del,
	concat,
	clean,
	postcss,
	cssSort,
	autoprefixer,
	sourcemap,
	readFileSync,
	stripComment,
	uglify,
	sass,
	rename,
	Fiber,
	plumber,
	babel,
	babelify,
	browserify,
	buffer,
	source,
	uglifyES,
	pug,
	bSync,
};

const vendors = JSON.parse(readFileSync("_vendors.json"));
// Clean _dist
const cleanDist = () => {
	return FileManage(_).Delete("_dist");
};
// Copy fonts
const copyFonts = () => {
	let fonts = vendors.fonts;
	return FileManage(_).Copy(fonts, "_dist/fonts");
};
// Copy favicon
const copyFavicon = () => {
	return FileManage(_).Copy("./src/favicon/**/**", "_dist/favicon");
};
// Copy assets
const copyAssets = () => {
	return FileManage(_).Copy(
		"src/assets/**/**.{svg,png,jpg,jpeg,gif,mp4}",
		"_dist/assets",
	);
};
// Copy fake api
const copyFakeApi = () => {
	return FileManage(_).Copy("src/api/**/**", "_dist/api");
};

const CoreBuildTask = (cb) => {
	CoreBuild(_).js(vendors);
	CoreBuild(_).css(vendors);
	return cb();
};

const mainJs_Browserify = () => {
	return MainBuild(_).jsBrowserify();
};

const mainJs_NormalBabel = () => {
	return MainBuild(_).jsNormalBabel();
};

const mainCss = () => {
	const glob = ["src/scss/**.scss", "!src/scss/_*.scss"];
	return MainBuild(_).css(glob);
};

const mainHtml = () => {
	const glob = ["src/*.pug"];
	return MainBuild(_).html(glob);
};

const serve = () => {
	return Serve(_).server();
};

exports.default = gulp.series(
	cleanDist,
	copyAssets,
	copyFonts,
	copyFavicon,
	copyFakeApi,
	CoreBuildTask,
	mainJs_Browserify,
	mainJs_NormalBabel,
	mainCss,
	mainHtml,
	serve,
);
