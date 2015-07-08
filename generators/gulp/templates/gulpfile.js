'use strict';
<% if (includeCoveralls) { -%>
var path = require('path');
<% } -%>
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
<% if (includeCoveralls) { -%>
var coveralls = require('gulp-coveralls');
<% } -%>
<% if (babel) { -%>
var babel = require('gulp-babel');
<% } -%>
var plumber = require('gulp-plumber');

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function () {
  return gulp.src([
      '**/*.js',
      '!node_modules/**'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .on('error', handleErr);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')<% if (babel) { %>
    .pipe(babel())<% } %>
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'<% if (babel) { %>, require: ['babel-core/register']<% } %>}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});
<% if (includeCoveralls) { -%>

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});
<% } -%>
<% if (babel) { -%>

gulp.task('babel', function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
<% } -%>

gulp.task('default', [<%- tasks %>]);
