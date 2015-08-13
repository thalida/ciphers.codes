var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	del = require('del'),
	bowerFiles = require('main-bower-files'),
	inject = require('gulp-inject'),
	KarmaServer = require('karma').Server;

gulp.task('clean', function(cb) {
	del(['dist/assets', 'dist/ciphers', 'dist/views'], cb);
});

gulp.task('copy', function() {
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist/'));
	gulp.src('app/views/**/*.html')
		.pipe(gulp.dest('dist/views/'));
});

gulp.task('minify-app', function(){
	var destFolder = 'dist';
	var destFile = 'app';

	return gulp.src([
			'app/app.js',
			'app/ciphers/*.js',
			'app/ciphers/types/**/*.service.js',
			'app/components/**/*.js',
			'app/views/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat(destFile + '.js'))
		.pipe(gulp.dest(destFolder))
		.pipe(rename(destFile + '.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destFolder));
});

gulp.task('minify-bower', function(){
	return gulp.src(bowerFiles(), {base: './app/bower_components'})
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/libs'));
});

gulp.task('minify-styles', function() {
	return gulp.src([
			'app/assets/sass/**/*.scss'
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('inject', ['minify-styles', 'minify-app', 'minify-bower'], function(){
	gulp.src('./dist/index.html')
		.pipe(inject(gulp.src('./dist/assets/css/app.css'), {relative: true}))
		.pipe(inject(gulp.src('./dist/app.js'), {relative: true}))
		.pipe(inject(gulp.src('./dist/libs/libs.min.js'), {relative: true, name: 'bower'}))
		.pipe(gulp.dest('./dist'));
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

gulp.task('webserver', function() {
	connect.server({
		livereload: true,
		port: 8000,
		root: ['dist']
	});
});

gulp.task('tests', function (done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.html', ['copy']);
	gulp.watch('app/**/*.scss', ['styles']);
	gulp.watch(['app/ciphers/*.js', 'app/ciphers/types/**/*.js'], ['concatCiphers']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('copy', 'minify-styles', 'minify-app', 'minify-bower', 'inject', 'webserver', 'tests', 'livereload', 'watch');
});
