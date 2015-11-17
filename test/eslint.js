'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:eslint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/eslint'))
      .on('end', done);
  });

  it('creates .eslintrc', function () {
    assert.file('.eslintrc');
  });

  it('fill env .eslintrc', function () {
    assert.fileContent('.eslintrc', /"env": {/);
    assert.fileContent('.eslintrc', /"node": true/);
    assert.fileContent('.eslintrc', /"mocha": true/);
  });


  describe('--es2015', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({es2015: true})
        .on('end', done);
    });

    it('fill .eslintrc for ES2015', function () {
      assert.fileContent('.eslintrc', /"es6": true/);
      assert.fileContent('.eslintrc', /"ecmaFeatures": {\s*"modules": true\s*}/);
    });
  });
});

describe('node:eslint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/eslint'))
      .withOptions({generateInto: 'other/'})
      .on('end', done);
  });

  it('creates .eslintrc with generate-into option', function () {
    assert.file('other/.eslintrc');
  });

  it('fill env .eslintrc with generate-into option', function () {
    assert.fileContent('other/.eslintrc', /"env": {/);
    assert.fileContent('other/.eslintrc', /"node": true/);
    assert.fileContent('other/.eslintrc', /"mocha": true/);
  });


  describe('--es2015 and --option', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({es2015: true, generateInto: 'other/'})
        .on('end', done);
    });

    it('fill .eslintrc for ES2015', function () {
      assert.fileContent('other/.eslintrc', /"es6": true/);
      assert.fileContent('other/.eslintrc', /"ecmaFeatures": {\s*"modules": true\s*}/);
    });
  });
});
