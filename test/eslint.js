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

  it('fill .eslintrc', function () {
    assert.fileContent('.eslintrc', /"rules": {/);
    assert.fileContent('.eslintrc', /"strict": \[\s*2,\s*"global"\s*\]/);
    assert.fileContent('.eslintrc', /"quotes": \[\s*2,\s*"single"\s*\]/);
    assert.fileContent('.eslintrc', /"indent": \[\s*2,\s*2\s*\]/);
    assert.fileContent('.eslintrc', /"one-var": \[\s*2,\s*"never"\s*\]/);
    assert.fileContent('.eslintrc', '"consistent-return": 0');
    assert.fileContent('.eslintrc', /"no-use-before-define": \[\s*2,\s*"nofunc"\s*\]/);
    assert.fileContent('.eslintrc', /"space-before-function-paren": \[\s*2,\s*{\s*"anonymous": "always",\s*"named": "never"\s*}\s*]/);
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
