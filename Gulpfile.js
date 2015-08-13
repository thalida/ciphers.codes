var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	KarmaServer = require('karma').Server;

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

gulp.task('concatCiphers', function(){
	var ciphersDest = 'app/ciphers/dist';
	var ciphersDestFile = 'ciphers.generated';

	return gulp.src(['app/ciphers/*.js', 'app/ciphers/types/**/*.service.js'])
		.pipe(sourcemaps.init())
		.pipe(concat(ciphersDestFile + '.js'))
		.pipe(gulp.dest(ciphersDest))
		.pipe(rename(ciphersDestFile + '.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(ciphersDest));
});

gulp.task('tests', function (done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.scss', ['sass']);
	gulp.watch(['app/ciphers/*.js', 'app/ciphers/types/**/*.js'], ['concatCiphers']);
});

gulp.task('default', ['sass', 'concatCiphers', 'webserver', 'tests', 'livereload', 'watch']);
