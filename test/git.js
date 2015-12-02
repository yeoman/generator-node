'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:git', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .withOptions({
        repositoryPath: 'yeoman/generator-node',
        account: 'dummyOrg',
        name: 'dummyProject'
      })
      .on('end', done);
  });

  it('creates .gitignore', function () {
    assert.file('.gitignore');
  });

  it('creates .gitattributes', function () {
    assert.file('.gitattributes');
  });

  it('initialize git repository', function () {
    assert.file('.git');
  });

  it('.git/config has the correct repo base url', function () {
    assert.fileContent('.git/config', /url = git@github\.com:dummyOrg\/dummyProject\.git/);
  });
});

describe('node:git', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .withOptions({
        repositoryPath: 'yeoman/generator-node',
        account: 'dummyOrg',
        name: 'dummyProject',
        generateInto: 'other/'
      })
      .on('end', done);
  });

  it('creates .gitignore with generate-into option', function () {
    assert.file('other/.gitignore');
  });

  it('creates .gitattributes with generate-into option', function () {
    assert.file('other/.gitattributes');
  });

  it('initialize git repository with generate-into option', function () {
    assert.file('other/.git');
  });
});

describe('node:git with a dummy git server url', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .withOptions({
        repositoryPath: 'yeoman/generator-node',
        repoBaseUrl: 'ssh://git@dummy.xyz/',
        account: 'dummyOrg',
        name: 'dummyProject'
      })
      .on('end', done);
  });

  it('.git/config has the correct repo base url', function () {
    assert.fileContent('.git/config', /url = ssh:\/\/git@dummy\.xyz\/dummyOrg\/dummyProject\.git/);
  });
});
