<% if (!babel) { -%>
'use strict';
<% } -%>
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
<% if (includeCoveralls) { -%>
var coveralls = require('gulp-coveralls');
<% } -%>
<% if (cli) { -%>
var lec = require('gulp-line-ending-corrector');
<% } -%>
<% if (babel) { -%>
var babel = require('gulp-babel');
var del = require('del');
var isparta = require('isparta');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-register');
<% } -%>

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('<%- projectRoot %>')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true<% if (babel) { %>,
      instrumenter: isparta.Instrumenter<% } %>
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
<% if (includeCoveralls) { -%>

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});
<% } -%>
<% if (cli) { -%>
gulp.task('line-ending-corrector', function () {
  return gulp.src('<%- projectRoot.replace("**/*.js", "cli.js") %>')
    .pipe(excludeGitignore())
    .pipe(lec())
    .pipe(gulp.dest('.'));
});
<% } -%>
<% if (babel) { -%>

gulp.task('babel', ['clean'], function () {
  return gulp.src('<%- projectRoot %>')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});
<% } -%>

gulp.task('prepublish', <%- prepublishTasks %>);
gulp.task('default', <%- tasks %>);
