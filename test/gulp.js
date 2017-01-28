'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:gulp', function () {
  describe('--projectRoot', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          projectRoot: 'generators'
        });
    });

    it('define a custom root', function () {
      assert.fileContent('gulpfile.js', 'gulp.src(\'generators/**/*.js\')');
      assert.noFileContent('gulpfile.js', 'gulp.src(\'lib/**/*.js\')');
    });
  });
});

describe('node:gulp', function () {
  describe('--projectRoot and --generate-into', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          projectRoot: 'generators',
          generateInto: 'other/'
        });
    });

    it('define a custom root', function () {
      assert.fileContent('other/gulpfile.js', 'gulp.src(\'generators/**/*.js\')');
      assert.noFileContent('other/gulpfile.js', 'gulp.src(\'lib/**/*.js\')');
    });
  });
});
