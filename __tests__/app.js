'use strict';
const _ = require('lodash');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:app', () => {
  beforeEach(() => {
    jest.mock('npm-name', () => {
      return () => Promise.resolve(true);
    });

    jest.mock('github-username', () => {
      return () => Promise.resolve('unicornUser');
    });

    jest.mock('generator-license/app', () => {
      const helpers = require('yeoman-test');
      return helpers.createDummyGenerator();
    });
  });

  describe('running on new project', () => {
    it('scaffold a full project', () => {
      const answers = {
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
      return helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(answers)
        .then(() => {
          assert.file([
            '.travis.yml',
            '.editorconfig',
            '.gitignore',
            '.gitattributes',
            'README.md',
            'lib/index.js',
            'lib/__tests__/generatorNode.test.js'
          ]);

          assert.file('package.json');
          assert.jsonFileContent('package.json', {
            name: 'generator-node',
            version: '0.0.0',
            description: answers.description,
            homepage: answers.homepage,
            repository: 'yeoman/generator-node',
            author: {
              name: answers.authorName,
              email: answers.authorEmail,
              url: answers.authorUrl
            },
            files: ['lib'],
            keywords: answers.keywords,
            main: 'lib/index.js'
          });

          assert.file('README.md');
          assert.fileContent(
            'README.md',
            "const generatorNode = require('generator-node');"
          );
          assert.fileContent('README.md', '> A node generator');
          assert.fileContent('README.md', '$ npm install --save generator-node');
          assert.fileContent('README.md', '© [The Yeoman Team](http://yeoman.io)');
          assert.fileContent(
            'README.md',
            '[travis-image]: https://travis-ci.org/yeoman/generator-node.svg?branch=master'
          );
          assert.fileContent('README.md', 'coveralls');

          assert.fileContent('.travis.yml', '| coveralls');
        });
    });
  });

  describe('running on existing project', () => {
    it('Keeps current Readme and extend package.json fields', () => {
      const pkg = {
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-node',
        author: 'The Yeoman Team',
        files: ['lib'],
        keywords: ['bar']
      };
      return helpers
        .run(require.resolve('../generators/app'))
        .withPrompts({ name: 'generator-node' })
        .on('ready', gen => {
          gen.fs.writeJSON(gen.destinationPath('package.json'), pkg);
          gen.fs.write(gen.destinationPath('README.md'), 'foo');
        })
        .then(() => {
          const newPkg = _.extend({ name: 'generator-node' }, pkg);
          assert.jsonFileContent('package.json', newPkg);
          assert.fileContent('README.md', 'foo');
        });
    });
  });

  describe('--no-travis', () => {
    it('skip .travis.yml', () => {
      return helpers
        .run(require.resolve('../generators/app'))
        .withOptions({ travis: false })
        .then(() => assert.noFile('.travis.yml'));
    });
  });

  describe('--projectRoot', () => {
    it('include the raw files', () => {
      return helpers
        .run(require.resolve('../generators/app'))
        .withOptions({ projectRoot: 'generators' })
        .then(() => {
          assert.jsonFileContent('package.json', {
            files: ['generators'],
            main: 'generators/index.js'
          });
        });
    });
  });

  describe('--no-editorconfig', () => {
    it('include the raw files', () => {
      return helpers
        .run(require.resolve('../generators/app'))
        .withOptions({ editorconfig: false })
        .then(() => assert.noFile('.editorconfig'));
    });
  });
});
