'use strict';
var _ = require('lodash');
var mockery = require('mockery');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var fs = require('fs');

function assertJSONFileContains(filename, content) {
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assertObjectContains(obj, content);
}

function assertObjectContains(obj, content) {
  Object.keys(content).forEach(function (key) {
    if (typeof content[key] === 'object') {
      assertObjectContains(content[key], obj[key]);
    } else {
      assert.equal(content[key], obj[key]);
    }
  });
}


describe('node:app', function () {
  before(function () {
    mockery.enable({warnOnUnregistered: false});

    mockery.registerMock('npm-name', function (name, cb) {
      cb(true);
    });

    mockery.registerMock(
      require.resolve('generator-license/app'),
      helpers.createDummyGenerator()
    );
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
        githubUsername: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: ['foo', 'bar']
      };
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        '.travis.yml',
        '.editorconfig',
        '.jshintrc',
        '.gitignore',
        '.gitattributes',
        '.jscsrc',
        'README.md',
        'lib/index.js',
        'test/index.js'
      ]);
    });

    it('creates package.json', function () {
      assert.file('package.json');
      assertJSONFileContains('package.json', {
        name: 'generator-node',
        version: '0.0.0',
        description: this.answers.description,
        homepage: this.answers.homepage,
        repository: 'yeoman/generator-node',
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail,
          url: this.answers.authorUrl
        },
        files: ['lib'],
        keywords: this.answers.keywords
      });
    });
  });

  describe('running on existing project', function () {
    before(function (done) {
      this.pkg = {
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-node',
        author: 'The Yeoman Team',
        files: ['lib'],
        keywords: ['bar']
      };
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'generator-node'
        })
        .on('ready', function (gen) {
          gen.fs.writeJSON(gen.destinationPath('package.json'), this.pkg);
          gen.fs.write(gen.destinationPath('README.md'), 'foo');
        }.bind(this))
        .on('end', done);
    });

    it('extends package.json keys with missing ones', function () {
      var pkg = _.extend({name: 'generator-node'}, this.pkg);
      assertJSONFileContains('package.json', pkg);
    });

    it('does not overwrite previous README.md', function () {
      assert.fileContent('README.md', 'foo');
    });
  });

  describe('--no-travis', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({travis: false})
        .on('end', done);
    });

    it('skip .travis.yml', function () {
      assert.noFile('.travis.yml');
    });
  });
});
