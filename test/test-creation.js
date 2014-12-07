/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('node generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('node:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/mymodule_example.js',
      'cli.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      'Gruntfile.js',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'pkgName': false,
      'license': 'MIT',
      'homepage': 'http://yeoman.io',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'authorUrl': 'http://yeoman.io',
      'keywords': 'keyword1,keyword2,keyword3',
      'cli': true,
      'browser': true
    });

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent('package.json', /"name": "mymodule"/);
      assert.deepEqual(require('./temp/cli.js'), {});
      done();
    });

  });

  it('creates expected files without cli', function (done) {
    var expected = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/mymodule_example.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      'Gruntfile.js',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'pkgName': false,
      'license': 'MIT',
      'homepage': 'http://yeoman.io',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'authorUrl': 'http://yeoman.io',
      'keywords': 'keyword1,keyword2,keyword3',
      'cli': false,
      'browser': true
    });

    this.app.run({}, function () {
      assert.file(expected);
      assert.fileContent('package.json', /"name": "mymodule"/);
      done();
    });
  });
});
