'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:travis', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/travis'))
      .on('end', done);
  });

  it('creates .travis.yml', function () {
    assert.file('.travis.yml');
  });

  it('fill .travis.yml', function () {
    assert.fileContent('.travis.yml', 'sudo: false');
    assert.fileContent('.travis.yml', 'language: node_js');
    assert.fileContent('.travis.yml', /node_js:\s*- '0\.10'\s*- '0\.12'\s*- 'iojs'/);
  });

  describe('with existing npm-shrinkwrap.json', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/travis'))
        .on('ready', function (generator) {
          generator.fs.write(
            generator.destinationPath('npm-shrinkwrap.json'),
            '{"name": "my-lib", "version": "1.0.0", "dependencies": {}}'
          );
        })
        .on('end', done);
    });

    it('fill .travis.yml for caching node_modules', function () {
      assert.fileContent('.travis.yml', /cache:\s*directories:\s*- node_modules/);
      assert.fileContent('.travis.yml', '- npm install -g npm@latest');
      assert.fileContent('.travis.yml', '- ./scripts/travis-caching-dependencies.sh');
    });

    it('create scripts/travis-caching-dependencies.sh', function () {
      assert.file('scripts/travis-caching-dependencies.sh');
    });
  });
});
