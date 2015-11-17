'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:editorconfig', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/editorconfig'))
      .on('end', done);
  });

  it('creates .editorconfig', function () {
    assert.file('.editorconfig');
  });
});

describe('node:editorconfig', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/editorconfig'))
      .withOptions({generateInto: 'other/'})
      .on('end', done);
  });

  it('creates .editorconfig with generate-into option', function () {
    assert.file('other/.editorconfig');
  });
});
