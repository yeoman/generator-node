'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:cli', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/cli'))
      .on('ready', function (generator) {
        generator.fs.write(
          generator.destinationPath('package.json'),
          '{"name": "my-lib"}'
        );
      });
  });

  it('creates cli.js', function () {
    assert.file('lib/cli.js');
    assert.fileContent('lib/cli.js', 'var meow = require(\'meow\')');
    assert.fileContent('lib/cli.js', 'var myLib = require(\'./\')');
  });

  it('Extends package.json', function () {
    assert.fileContent('package.json', '"bin": "lib/cli.js"');
    assert.fileContent('package.json', '"meow"');
  });
});

describe('node:cli', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/cli'))
      .withOptions({generateInto: 'other/'})
      .on('ready', function (generator) {
        generator.fs.write(
          generator.destinationPath('other/package.json'),
          '{"name": "my-lib"}'
        );
      });
  });

  it('creates cli.js with path option', function () {
    assert.file('other/lib/cli.js');
  });
});
