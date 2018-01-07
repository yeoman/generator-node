'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:git', () => {
  it('creates the git config files and init the repository', () => {
    return helpers
      .run(require.resolve('../generators/git'))
      .withOptions({
        githubAccount: 'yeoman',
        repositoryName: 'generator-node'
      })
      .then(() => {
        assert.file('.gitignore');
        assert.file('.gitattributes');
        assert.file('.git');

        assert.file('package.json');
        assert.jsonFileContent('package.json', {
          repository: 'yeoman/generator-node'
        });

        assert.fileContent(
          '.git/config',
          '[remote "origin"]\n	url = git@github.com:yeoman/generator-node.git'
        );
      });
  });

  it('respects --generate-into option', () => {
    return helpers
      .run(require.resolve('../generators/git'))
      .withOptions({
        githubAccount: 'other-account',
        repositoryName: 'other-name',
        generateInto: 'other/'
      })
      .then(() => {
        assert.file('other/.gitignore');
        assert.file('other/.gitattributes');
        assert.file('other/.git');

        assert.file('other/package.json');
        assert.jsonFileContent('other/package.json', {
          repository: 'other-account/other-name'
        });

        assert.fileContent(
          'other/.git/config',
          '[remote "origin"]\n	url = git@github.com:other-account/other-name.git'
        );
      });
  });

  it("doesn't add remote `origin` when either `githubAccount` isn't passed", () => {
    return helpers
      .run(require.resolve('../generators/git'))
      .withOptions({
        repositoryName: 'other-name'
      })
      .then(() => {
        assert.file('.gitignore');
        assert.file('.gitattributes');
        assert.file('.git');
        assert.file('package.json');

        assert.noFileContent('package.json', '"repository"');
        assert.noFileContent('.git/config', '[remote "origin"]');
      });
  });

  it("doesn't add remote `origin` when either `repositoryName` isn't passed", () => {
    return helpers
      .run(require.resolve('../generators/git'))
      .withOptions({
        githubAccount: 'other-account'
      })
      .then(() => {
        assert.file('.gitignore');
        assert.file('.gitattributes');
        assert.file('.git');
        assert.file('package.json');

        assert.noFileContent('package.json', '"repository"');
        assert.noFileContent('.git/config', '[remote "origin"]');
      });
  });
});
