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
      'LICENSE-MIT',
      'lib/mymodule.js',
      'test/mymodule_test.js',
      ['package.json', /"name": "mymodule"/],
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'version': '0.1.0',
      'repository': 'http://github.com/user/module',
      'bugs': 'http://jira.com',
      'licenses': 'MIT',
      'github_username': 'octocat',
      'author_name': 'Octo Cat',
      'author_email': 'octo@example.com',
      'node_version': '~0.10.5',
      'npm_test': 'grunt nodeunit -v',
      'main': 'lib/index.js'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
