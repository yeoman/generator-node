'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:boilerplate', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../../generators/boilerplate'))
      .withOptions({name: 'my-module'})
      .on('end', done);
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
  before(function (done) {
    helpers.run(path.join(__dirname, '../../generators/boilerplate'))
      .withOptions({name: 'my-module', babel: true})
      .on('end', done);
  });

  it('creates boilerplate files in ES2015', function () {
    assert.fileContent('lib/index.js', 'export default {};');
    assert.fileContent('test/index.js', 'import myModule');
  });
});
