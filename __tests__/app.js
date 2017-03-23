'use strict';
var _ = require('lodash');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:app', function () {
  beforeEach(function () {
    jest.mock('npm-name', function () {
      return () => Promise.resolve(true);
    });

    jest.mock('github-username', function () {
      return () => Promise.resolve('unicornUser');
    });

    jest.mock('generator-license/app', function () {
      var helpers = require('yeoman-test');
      return helpers.createDummyGenerator();
    });
  });

  describe('running on new project', function () {
    beforeEach(function () {
      this.answers = {
        name: 'generator-node',
        description: 'A node generator',
        homepage: 'http://yeoman.io',
        githubAccount: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: ['foo', 'bar'],
        includeCoveralls: true
      };
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(this.answers);
    });

    it('creates files', function () {
      assert.file([
        '.travis.yml',
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'README.md',
        'lib/index.js',
        'lib/__tests__/generatorNode.test.js'
      ]);
    });

    it('creates package.json', function () {
      assert.file('package.json');
      assert.jsonFileContent('package.json', {
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
        keywords: this.answers.keywords,
        main: 'lib/index.js'
      });
    });

    it('creates and fill contents in README.md', function () {
      assert.file('README.md');
      assert.fileContent('README.md', 'var generatorNode = require(\'generator-node\');');
      assert.fileContent('README.md', '> A node generator');
      assert.fileContent('README.md', '$ npm install --save generator-node');
      assert.fileContent('README.md', '© [The Yeoman Team](http://yeoman.io)');
      assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/generator-node.svg?branch=master');
      assert.fileContent('README.md', 'coveralls');
    });

    it('creates proper Travis config', function () {
      assert.fileContent('.travis.yml', '| coveralls');
    });
  });

  describe('running on existing project', function () {
    beforeEach(function () {
      this.pkg = {
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-node',
        author: 'The Yeoman Team',
        files: ['lib'],
        keywords: ['bar']
      };
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'generator-node'
        })
        .on('ready', function (gen) {
          gen.fs.writeJSON(gen.destinationPath('package.json'), this.pkg);
          gen.fs.write(gen.destinationPath('README.md'), 'foo');
        }.bind(this));
    });

    it('extends package.json keys with missing ones', function () {
      var pkg = _.extend({name: 'generator-node'}, this.pkg);
      assert.jsonFileContent('package.json', pkg);
    });

    it('does not overwrite previous README.md', function () {
      assert.fileContent('README.md', 'foo');
    });
  });

  describe('--no-travis', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({travis: false});
    });

    it('skip .travis.yml', function () {
      assert.noFile('.travis.yml');
    });
  });

  describe('--projectRoot', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({projectRoot: 'generators'});
    });

    it('include the raw files', function () {
      assert.jsonFileContent('package.json', {
        files: ['generators'],
        main: 'generators/index.js'
      });
    });
  });

  describe('--no-editorconfig', function () {
    it('include the raw files', function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({editorconfig: false})
        .then(() => assert.noFile('.editorconfig'));
    });
  });
});
