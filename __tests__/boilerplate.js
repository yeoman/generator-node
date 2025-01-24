const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:boilerplate', () => {
  beforeEach(() => {
    return helpers
      .run(require.resolve('../generators/boilerplate'))
      .withOptions({ name: 'my-module' });
  });

  it('creates boilerplate files', () => {
    assert.file('lib/index.js');
    assert.file('lib/__tests__/myModule.test.js');
    assert.fileContent('lib/index.js', 'module.exports = {};');
    assert.fileContent('lib/__tests__/myModule.test.js', 'const myModule');
    assert.fileContent('lib/__tests__/myModule.test.js', "describe('myModule'");
  });
});

describe('node:boilerplate', () => {
  beforeEach(() => {
    return helpers
      .run(require.resolve('../generators/boilerplate'))
      .withOptions({ name: 'my-module', generateInto: 'other/' });
  });

  it('creates boilerplate files using another path', () => {
    assert.file('other/lib/index.js');
    assert.file('other/lib/__tests__/myModule.test.js');
    assert.fileContent('other/lib/index.js', 'module.exports = {};');
    assert.fileContent('other/lib/__tests__/myModule.test.js', 'const myModule');
    assert.fileContent('other/lib/__tests__/myModule.test.js', "describe('myModule'");
  });
});
