'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:gulp', function () {
  describe('including coveralls', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: true,
          projectRoot: 'lib'
        })
        .toPromise();
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
      assert.fileContent('package.json', '"prepublish": "gulp prepublish"');
    });

    it('does not include babel configurations', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'babel\'');
      assert.noFileContent('package.json', 'gulp-babel');
    });
  });

  describe('excluding coveralls', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: false,
          projectRoot: 'lib'
        })
        .toPromise();
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('package.json', 'gulp-coveralls');
    });
  });

  describe('--no-coveralls', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: false,
          projectRoot: 'lib'
        })
        .toPromise();
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('package.json', 'gulp-coveralls');
    });
  });

  describe('--babel', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          babel: true,
          projectRoot: 'lib'
        })
        .toPromise();
    });

    it('includes babel configuration', function () {
      assert.fileContent('gulpfile.js', 'gulp.task(\'babel\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'prepublish\', [\'nsp\', \'babel\']);');
      assert.fileContent('package.json', 'gulp-babel');
      assert.fileContent('.gitignore', 'dist');
    });
  });

  describe('--projectRoot', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          projectRoot: 'generators'
        })
        .toPromise();
    });

    it('define a custom root', function () {
      assert.fileContent('gulpfile.js', 'gulp.src(\'generators/**/*.js\')');
      assert.noFileContent('gulpfile.js', 'gulp.src(\'lib/**/*.js\')');
    });
  });
});

describe('node:gulp', function () {
  describe('including coveralls with generate-into option', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: true,
          projectRoot: 'lib',
          generateInto: 'other/'
        })
        .toPromise();
    });

    it('creates files and configuration', function () {
      assert.file([
        'other/gulpfile.js',
        'other/package.json'
      ]);

      assert.fileContent('other/gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.fileContent('other/gulpfile.js', 'gulp.task(\'test\'');
      assert.fileContent('other/gulpfile.js', 'gulp.task(\'static\'');

      assert.fileContent('other/package.json', 'gulp');
      assert.fileContent('other/package.json', 'gulp-coveralls');
      assert.fileContent('other/package.json', '"test": "gulp"');
      assert.fileContent('other/package.json', '"prepublish": "gulp prepublish"');
    });

    it('does not include babel configurations', function () {
      assert.noFileContent('other/gulpfile.js', 'gulp.task(\'babel\'');
      assert.noFileContent('other/package.json', 'gulp-babel');
    });
  });

  describe('excluding coveralls with generate-into option', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: false,
          projectRoot: 'lib',
          generateInto: 'other/'
        })
        .toPromise();
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('other/gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('other/package.json', 'gulp-coveralls');
    });
  });

  describe('--no-coveralls and --generate-into', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          coveralls: false,
          projectRoot: 'lib',
          generateInto: 'other/'
        })
        .toPromise();
    });

    it('does not include coveralls configurations', function () {
      assert.noFileContent('other/gulpfile.js', 'gulp.task(\'coveralls\'');
      assert.noFileContent('other/package.json', 'gulp-coveralls');
    });
  });

  describe('--babel and --generate-into', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          babel: true,
          projectRoot: 'lib',
          generateInto: 'other/'
        })
        .toPromise();
    });

    it('includes babel configuration', function () {
      assert.fileContent('other/gulpfile.js', 'gulp.task(\'babel\'');
      assert.fileContent('other/gulpfile.js', 'gulp.task(\'prepublish\', [\'nsp\', \'babel\']);');
      assert.fileContent('other/package.json', 'gulp-babel');
      assert.fileContent('other/.gitignore', 'dist');
    });
  });

  describe('--projectRoot and --generate-into', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          projectRoot: 'generators',
          generateInto: 'other/'
        })
        .toPromise();
    });

    it('define a custom root', function () {
      assert.fileContent('other/gulpfile.js', 'gulp.src(\'generators/**/*.js\')');
      assert.noFileContent('other/gulpfile.js', 'gulp.src(\'lib/**/*.js\')');
    });
  });
});
