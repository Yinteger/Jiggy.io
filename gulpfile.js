'use strict';

const gulp = require('gulp');

console.log(process.argv);

function loadTask(fileName, taskName) {
    var taskModule = require('./tools/gulp/' + fileName);
    var task = taskName ? taskModule[taskName] : taskModule;
    return task(gulp);
}

gulp.task('build', loadTask('build', 'all'));
gulp.task('publish', loadTask('publish', 'all'));
