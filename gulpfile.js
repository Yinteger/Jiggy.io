var gulp = require('gulp');
var webpack = require('gulp-webpack');
var hg = require('gulp-hg');
var typescript = require('gulp-typescript');
var install  = require('gulp-install');
var ChildProcess = require('child_process');

gulp.task('default', [
	'update',
	'install',
	'build'
]);

gulp.task('update', function() {
	hg.pull(function(err, stdout) {
		if (!err) {
			hg.update(function(err, stdout) {

			});
		}
	});
});

gulp.task('install', function() {
	gulp.src('./package.json').pipe(install());
	ChildProcess.exec('npm link typescript');
	ChildProcess.exec('npm link webpack');
	ChildProcess.exec('npm link typings');
	ChildProcess.exec('typings install', function(err, stdout) {
		if (err) {
			console.log(err);
		}
		console.log(stdout);
	});
});

gulp.task('typescript', function() {
	var tsproject = typescript.createProject('tsconfig.json');
	return tsproject.src().pipe(typescript(tsproject)).js.pipe(gulp.dest('release'));
});

gulp.task('build', function() {
	return gulp.src('./Source/Engine.ts')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./'));
});