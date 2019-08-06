function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
