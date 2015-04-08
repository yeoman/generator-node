'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:jscs', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/jscs'))
      .on('end', done);
  });

  it('creates .jscsrc', function () {
    assert.file('.jscsrc');
  });
});
