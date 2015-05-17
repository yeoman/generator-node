'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:boilerplate', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module'})
      .on('end', done);
  });

  it('creates boilerplate files', function () {
    assert.file('lib/index.js');
    assert.file('test/index.js');
    assert.fileContent('lib/index.js', 'export default {};');
    assert.fileContent('test/index.js', 'import myModule');
    assert.fileContent('test/index.js', 'describe(\'my-module\'');
  });
});

describe('node:boilerplate --no-babel', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .withOptions({name: 'my-module', babel: false})
      .on('end', done);
  });

  it('creates boilerplate files in ES5', function () {
    assert.fileContent('lib/index.js', 'module.exports = {};');
    assert.fileContent('test/index.js', 'var myModule');
  });
});
