'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:boilerplate', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module'})
      .toPromise();
  });

  it('creates boilerplate files', function () {
    assert.file('lib/index.js');
    assert.file('test/index.js');
    assert.fileContent('lib/index.js', 'module.exports = {};');
    assert.fileContent('test/index.js', 'var myModule');
    assert.fileContent('test/index.js', 'describe(\'my-module\'');
  });
});

describe('node:boilerplate', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module', babel: true})
      .toPromise();
  });

  it('creates boilerplate files in ES2015', function () {
    assert.fileContent('lib/index.js', 'export default {};');
    assert.fileContent('test/index.js', 'import myModule');
  });
});

describe('node:boilerplate', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module', generateInto: 'other/'})
      .toPromise();
  });

  it('creates boilerplate files using another path', function () {
    assert.file('other/lib/index.js');
    assert.file('other/test/index.js');
    assert.fileContent('other/lib/index.js', 'module.exports = {};');
    assert.fileContent('other/test/index.js', 'var myModule');
    assert.fileContent('other/test/index.js', 'describe(\'my-module\'');
  });
});
