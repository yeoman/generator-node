'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:travis', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../../generators/travis'))
      .on('end', done);
  });

  it('creates .travis.yml', function () {
    assert.file('.travis.yml');
  });
});
