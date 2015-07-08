'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:cli', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/cli'))
      .withOptions({babel: true})
      .on('end', done);
  });

  it('creates cli.js', function () {
    assert.file('lib/cli.js');
    assert.fileContent('lib/cli.js', 'import meow from \'meow\'');
  });

  it('Contains package name references', function() {
    assert.noFileContent('lib/cli.js', 'var = require(\'./\');');
    assert.noFileContent('lib/cli.js', 'import  from \'./\';');
  });

  it('Extends package.json', function () {
    assert.fileContent('package.json', '"bin": "dist/cli.js"');
    assert.fileContent('package.json', '"meow"');
  });

  describe('--no-babel', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/cli'))
        .withOptions({babel: false})
        .on('end', done);
    });

    it('does not use any ES2015 syntax', function () {
      assert.noFileContent('lib/cli.js', 'import meow from \'meow\'');
    });
  });
});
