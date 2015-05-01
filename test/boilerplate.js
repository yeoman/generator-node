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
    assert.fileContent('test/index.js', 'var myModule');
    assert.fileContent('test/index.js', 'describe(\'my-module\'');
  });
});
