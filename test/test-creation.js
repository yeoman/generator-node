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
      '.jshintrc',
      'lib/mymodule.js',
      'test/mymodule_test.js',
      ['package.json', /"name": "mymodule"/],
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'version': '0.1.0',
      'repository': 'http://github.com',
      'bugs': 'http://jira.com',
      'license': 'MIT',
      'github_username': 'octocat',
      'author_name': 'Octo Cat',
      'author_email': 'octo@example.com',
      'node_version': '~0.10.5'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
