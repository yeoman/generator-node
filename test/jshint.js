'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:jshint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/jshint'))
      .on('end', done);
  });

  it('creates .jshintrc', function () {
    assert.file([
      '.jshintrc'
    ]);
  });
});
