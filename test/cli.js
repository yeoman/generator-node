'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:cli', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/cli'))
      .withOptions({babel: true})
      .on('ready', function (generator) {
        generator.fs.write(
          generator.destinationPath('package.json'),
          '{"name": "my-lib"}'
        );
      })
      .toPromise();
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
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/cli'))
        .withOptions({babel: false})
        .toPromise();
    });

    it('does not use any ES2015 syntax', function () {
      assert.noFileContent('lib/cli.js', 'import meow from \'meow\'');
    });
  });
});

describe('node:cli', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/cli'))
      .withOptions({babel: true, generateInto: 'other/'})
      .on('ready', function (generator) {
        generator.fs.write(
          generator.destinationPath('other/package.json'),
          '{"name": "my-lib"}'
        );
      })
      .toPromise();
  });

  it('creates cli.js with path option', function () {
    assert.file('other/lib/cli.js');
    assert.fileContent('other/lib/cli.js', 'import meow from \'meow\'');
    assert.fileContent('other/lib/cli.js', 'import myLib from \'./\';');
  });

  it('Extends package.json', function () {
    assert.fileContent('other/package.json', '"bin": "dist/cli.js"');
    assert.fileContent('other/package.json', '"meow"');
  });

  describe('--no-babel and --generate-into', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/cli'))
        .withOptions({babel: false, generateInto: 'other/'})
        .toPromise();
    });

    it('does not use any ES2015 syntax', function () {
      assert.noFileContent('other/lib/cli.js', 'import meow from \'meow\'');
    });
  });
});
