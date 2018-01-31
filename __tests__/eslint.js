const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:eslint', () => {
  it('fill package.json', () =>
    helpers.run(require.resolve('../generators/eslint')).then(() => {
      assert.fileContent('package.json', /"eslint-config-xo":/);
      assert.jsonFileContent('package.json', {
        eslintConfig: {
          extends: ['airbnb'],
          env: {
            mocha: true,
          },
        },
        scripts: {
          pretest: 'eslint .',
        },
      });
      assert.file('.eslintignore');
    }));

  it('respect --generate-into option as the root of the scaffolding', () =>
    helpers
      .run(require.resolve('../generators/eslint'))
      .withOptions({ generateInto: 'other/' })
      .then(() => {
        assert.fileContent('other/package.json', /"eslint-config-xo":/);
        assert.jsonFileContent('other/package.json', {
          eslintConfig: {
            extends: ['airbnb'],
          },
        });
        assert.file('other/.eslintignore');
      }));
});
