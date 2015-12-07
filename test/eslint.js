'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:eslint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/eslint'))
      .on('end', done);
  });

  it('fill package.json', function () {
    assert.fileContent('package.json', /"eslint-config-xo-space":/);
    assert.jsonFileContent('package.json', {
      eslintConfig: {
        extends: 'xo-space',
        env: {
          mocha: true
        }
      }
    });
  });

  describe('--es2015', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({es2015: true})
        .on('end', done);
    });

    it('fill package.json for ES2015', function () {
      assert.fileContent('package.json', /"babel-eslint":/);
      assert.fileContent('package.json', /"eslint-plugin-babel":/);
      assert.jsonFileContent('package.json', {
        eslintConfig: {
          extends: 'xo-space/esnext'
        }
      });
    });
  });

  describe('--generate-into', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/eslint'))
        .withOptions({generateInto: 'other/'})
        .on('end', done);
    });

    it('fill env .eslintrc with generate-into option', function () {
      assert.fileContent('other/package.json', /"eslint-config-xo-space":/);
      assert.jsonFileContent('other/package.json', {
        eslintConfig: {
          extends: 'xo-space'
        }
      });
    });
  });
});
