'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('ready', function (gen) {
        gen.fs.copy(
          path.join(__dirname, '../package.json'),
          gen.destinationPath('package.json')
        );
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.travis.yml',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      '.gitattributes',
      '.jscsrc'
    ]);
  });
});

describe('node:app --no-travis', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ travis: false })
      .on('ready', function (gen) {
        gen.fs.copy(
          path.join(__dirname, '../package.json'),
          gen.destinationPath('package.json')
        );
      })
      .on('end', done);
  });

  it('skip .travis.yml', function () {
    assert.noFile('.travis.yml');
  });
});
