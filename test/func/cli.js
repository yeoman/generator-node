'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:cli', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../../generators/cli'))
      .withOptions({babel: true})
      .on('ready', function (generator) {
        generator.fs.write(
          generator.destinationPath('package.json'),
          '{"name": "my-lib"}'
        );
      })
      .on('end', done);
  });

  it('creates cli.js', function () {
    assert.file('lib/cli.js');
    assert.fileContent('lib/cli.js', 'import meow from \'meow\'');
    assert.fileContent('lib/cli.js', 'import myLib from \'./\';');
  });

  it('Extends package.json', function () {
    assert.fileContent('package.json', '"bin": "dist/cli.js"');
    assert.fileContent('package.json', '"meow"');
  });

  describe('--no-babel', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/cli'))
        .withOptions({babel: false})
        .on('end', done);
    });

    it('does not use any ES2015 syntax', function () {
      assert.noFileContent('lib/cli.js', 'import meow from \'meow\'');
    });
  });
});
