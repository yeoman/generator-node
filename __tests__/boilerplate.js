'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:boilerplate', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module'});
  });

  it('creates boilerplate files', function () {
    assert.file('lib/index.js');
    assert.file('lib/__tests__/myModule.test.js');
    assert.fileContent('lib/index.js', 'module.exports = {};');
    assert.fileContent('lib/__tests__/myModule.test.js', 'const myModule');
    assert.fileContent('lib/__tests__/myModule.test.js', 'describe(\'myModule\'');
  });
});

describe('node:boilerplate', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module', generateInto: 'other/'});
  });

  it('creates boilerplate files using another path', function () {
    assert.file('other/lib/index.js');
    assert.file('other/lib/__tests__/myModule.test.js');
    assert.fileContent('other/lib/index.js', 'module.exports = {};');
    assert.fileContent('other/lib/__tests__/myModule.test.js', 'const myModule');
    assert.fileContent('other/lib/__tests__/myModule.test.js', 'describe(\'myModule\'');
  });
});
