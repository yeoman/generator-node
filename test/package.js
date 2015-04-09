'use strict';
var path = require('path');
var _ = require('lodash');
var mockery = require('mockery');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:package', function () {
  before(function () {
      mockery.enable({warnOnUnregistered: false});

      mockery.registerMock('npm-name', function (name, cb) {
        cb(true);
      });
  });

  after(function () {
    mockery.disable();
  });

  describe('running on new project', function () {
    before(function (done) {
      this.answers = {
        name: 'generator-node',
        description: 'A node generator',
        homepage: 'http://yeoman.io',
        license: 'MIT',
        githubUsername: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: ['foo', 'bar']
      };
      helpers.run(path.join(__dirname, '../generators/package'))
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('creates package.json', function () {
      assert.file('package.json');
      assert.fileContent('package.json', JSON.stringify({
        name: 'generator-node',
        version: '0.0.0',
        description: this.answers.description,
        homepage: this.answers.homepage,
        repository: 'yeoman/generator-node',
        license: this.answers.license,
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail,
          url: this.answers.authorUrl
        },
        scripts: {
          test: 'mocha -R spec'
        },
        files: ['lib'],
        keywords: this.answers.keywords
      }, null, 2));
    });
  });

  describe('running on existing project', function () {
    before(function (done) {
      this.pkg = {
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-node',
        license: 'BSD',
        author: 'The Yeoman Team',
        scripts: {
          test: 'mocha -R spec'
        },
        files: ['lib'],
        keywords: ['bar']
      };
      helpers.run(path.join(__dirname, '../generators/package'))
        .withPrompts({
          name: 'generator-node'
        })
        .on('ready', function(gen) {
          gen.fs.writeJSON(gen.destinationPath('package.json'), this.pkg);
        }.bind(this))
        .on('end', done);
    });

    it('creates package.json', function () {
      var pkg = _.extend({name: 'generator-node'}, this.pkg);
      assert.fileContent('package.json', JSON.stringify(pkg, null, 2));
    });
  });
});
