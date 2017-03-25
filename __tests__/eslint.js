'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:eslint', () => {
  it('fill package.json', () => {
    return helpers.run(require.resolve('../generators/eslint'))
      .then(() => {
        assert.fileContent('package.json', /"eslint-config-xo-space":/);
        assert.jsonFileContent('package.json', {
          eslintConfig: {
            extends: 'xo-space',
            env: {
              jest: true
            }
          },
          scripts: {
            pretest: 'eslint **/*.js --fix'
          }
        });
      });
  });

  it('respect --generate-into option as the root of the scaffolding', () => {
    return helpers.run(require.resolve('../generators/eslint'))
      .withOptions({generateInto: 'other/'})
      .then(() => {
        assert.fileContent('other/package.json', /"eslint-config-xo-space":/);
        assert.jsonFileContent('other/package.json', {
          eslintConfig: {
            extends: 'xo-space'
          }
        });
      });
  });
});
