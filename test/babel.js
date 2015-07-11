'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:babel', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/babel'))
      .on('end', done);
  });

  it('creates .babelrc', function () {
    assert.file('.babelrc');
  });

  it('setup prepublish step', function () {
    assert.fileContent('package.json', '"prepublish": "gulp babel"');
  });
});
