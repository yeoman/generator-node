'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('node:gulp', function () {
  describe('including coveralls', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .withPrompts({includeCoveralls: true})
        .on('end', done);
    });

    it('creates files and configuration', function () {
      assert.file([
        'gulpfile.js',
        'package.json'
      ]);

      assert.fileContent('gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'test\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'static\'');

      assert.fileContent('package.json', 'gulp');
      assert.fileContent('package.json', 'gulp-coveralls');
      assert.fileContent('package.json', '"test": "gulp"');
    });
  });

  describe('excluding coveralls', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .withPrompts({includeCoveralls: false})
        .on('end', done);
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('package.json', 'gulp-coveralls');
    });
  });

  describe('--no-coveralls', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({coveralls: false})
        .on('end', done);
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('package.json', 'gulp-coveralls');
    });
  });

});
