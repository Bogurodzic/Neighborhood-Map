var gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');


gulp.task("clean", function(){

	return del("build/**/*");

});

gulp.task('sass', function () {
    return gulp.src('./src/scss/main.scss')
    	.pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task("autoprefixer", function(){

	gulp.src("src/css/styles.css")
	.pipe(plumber())
	.pipe(autoprefixer({
		browsers: ['last 15 versions', "IE 9"]
	})).pipe(gulp.dest("src/css/"));

});

gulp.task("html", function(){

	 return gulp.src("src/*.html")
		.pipe(useref())
		//.pipe(if("*.js", plugins.uglify()))
		.pipe(gulp.dest("build/"));

});

gulp.task("copy", function(){

	return gulp.src(["src/fonts/*", "src/css/*", "src/img/*"], {
		base: "src/"
	})
	.pipe(gulp.dest("build/"));

});

gulp.task("images", function(){

	return gulp.src("build/img/*", {
		base: "build/"
	})
	.pipe(imagemin())
	.pipe(gulp.dest("build/"));

});

gulp.task("watch", function(){

	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("src/css/*.css", ["autoprefixer"]);
	gulp.watch(["src/css/*.css", "src/index.html", "src/js/*.js"], browserSync.reload);

});

gulp.task("build:server", function(){

	browserSync.init({
		server: "src/"
	});

});

gulp.task("build", function(){

	runSequence("clean", "sass", "autoprefixer", "copy", "html", "images");

});

gulp.task("server", ["watch", "build:server"]);
