'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:editorconfig', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/editorconfig'))
      .toPromise();
  });

  it('creates .editorconfig', function () {
    assert.file('.editorconfig');
  });
});

describe('node:editorconfig', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/editorconfig'))
      .withOptions({generateInto: 'other/'})
      .toPromise();
  });

  it('creates .editorconfig with generate-into option', function () {
    assert.file('other/.editorconfig');
  });
});
