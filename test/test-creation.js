/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
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
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      'Gruntfile.js',
      ['package.json', /"name": "mymodule"/],
      'README.md',
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
