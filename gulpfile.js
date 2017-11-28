//Include gulp
var gulp = require('gulp');

// Base folder
var src = 'src/';
var dest = 'build/';

// Include Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');

// Concatenating & Minifying JS Files
gulp.task('scripts', function() {
	return gulp.src(src + 'js/*.js')
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(dest + 'js'));
});

// Concatenating & Minifying CSS Files
gulp.task('css', function() {
	return gulp.src(src +'css/*.css')
		.pipe(concat('styles.css'))
		.pipe(minify())
		.pipe(gulp.dest(dest + 'css'));
});

// Task to copy index file
gulp.task('copy', function() {
	gulp.src('index3.html')
	.pipe(gulp.dest(dest));
});

// Adding Watch Task
gulp.task('watch', function() {
	gulp.watch(src + 'js/*.js', ['scripts']);
	gulp.watch(src + 'css/*.css', ['css']);
});

//Default task
gulp.task('default', ['scripts', 'css', 'watch', 'copy']);