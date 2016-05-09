'use strict';
var _ = require('lodash');
var mockery = require('mockery');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var Promise = require('pinkie-promise');

describe('node:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('npm-name', function () {
      return Promise.resolve(true);
    });

    mockery.registerMock('github-username', function (name, cb) {
      cb(null, 'unicornUser');
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
    before(function () {
      this.answers = {
        name: 'generator-node',
        description: 'A node generator',
        homepage: 'http://yeoman.io',
        githubAccount: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: ['foo', 'bar']
      };
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(this.answers)
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        '.travis.yml',
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'README.md',
        'lib/index.js',
        'test/index.js'
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
        files: ['dist'],
        keywords: this.answers.keywords,
        main: 'dist/index.js'
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
  });

  describe('running on existing project', function () {
    before(function () {
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
        }.bind(this))
        .toPromise();
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
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({travis: false})
        .toPromise();
    });

    it('skip .travis.yml', function () {
      assert.noFile('.travis.yml');
    });
  });

  describe('--no-babel', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({babel: false})
        .toPromise();
    });

    it('skip .bablerc', function () {
      assert.noFile('.babelrc');
    });

    it('include the raw files', function () {
      assert.jsonFileContent('package.json', {
        files: ['lib'],
        main: 'lib/index.js'
      });
    });
  });

  describe('--projectRoot', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({projectRoot: 'generators', babel: false})
        .toPromise();
    });

    it('include the raw files', function () {
      assert.jsonFileContent('package.json', {
        files: ['generators'],
        main: 'generators/index.js'
      });
    });
  });
});
