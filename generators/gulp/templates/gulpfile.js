'use strict';
var path = require('path');
var gulp = require('gulp');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
<% if (cli) { -%>
var lec = require('gulp-line-ending-corrector');
<% } -%>

gulp.task('pre-test', function () {
  return gulp.src('<%- projectRoot %>')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['<%- projectRoot %>', 'test/**'], ['test']);
});
<% if (cli) { -%>

gulp.task('line-ending-corrector', function () {
  return gulp.src('<%- projectRoot.replace("**/*.js", "cli.js") %>')
    .pipe(excludeGitignore())
    .pipe(lec())
    .pipe(gulp.dest('.'));
});
<% } -%>

gulp.task('prepublish', <%- prepublishTasks %>);
gulp.task('default', <%- tasks %>);
