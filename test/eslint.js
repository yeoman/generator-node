'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('node:eslint', function () {
  it('fill package.json', function () {
    return helpers.run(path.join(__dirname, '../generators/eslint'))
      .then(function () {
        assert.fileContent('package.json', /"eslint-config-xo-space":/);
        assert.jsonFileContent('package.json', {
          eslintConfig: {
            extends: 'xo-space',
            env: {
              mocha: true
            }
          },
          scripts: {
            pretest: 'eslint **/*.js --fix'
          }
        });
      });
  });

  it('respect generateInto option as the root of the scaffolding', function () {
    return helpers.run(path.join(__dirname, '../generators/eslint'))
      .withOptions({generateInto: 'other/'})
      .then(function () {
        assert.fileContent('other/package.json', /"eslint-config-xo-space":/);
        assert.jsonFileContent('other/package.json', {
          eslintConfig: {
            extends: 'xo-space'
          }
        });
      });
  });
});
