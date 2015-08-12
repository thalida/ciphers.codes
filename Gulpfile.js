var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch');

gulp.task('webserver', function() {
	connect.server({
		livereload: true,
		port: 8000,
		root: ['app']
	});
});

gulp.task('livereload', function() {
	var watchedFiles = [
		'app/**/*.css',
		'app/**/*.js',
		'app/**/*.html'
	];

	gulp
		.src(watchedFiles)
		.pipe(watch(watchedFiles))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp
    	.src([
    		'app/components/**/*.scss',
    		'app/views/**/*.scss',
    		'app/assets/sass/**/*.scss'
    	])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'webserver', 'livereload', 'watch']);
