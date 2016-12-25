'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var rootPkg = require('../package.json');

describe('node:nsp', function () {
  it('setup nsp in project', function () {
    return helpers.run(path.join(__dirname, '../generators/nsp')).then(function () {
      assert.jsonFileContent('package.json', {
        devDependencies: {
          nsp: rootPkg.devDependencies.nsp
        },
        scripts: {
          prepublish: 'nsp'
        }
      });
    });
  });
});
