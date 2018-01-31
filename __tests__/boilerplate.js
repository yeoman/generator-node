'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:boilerplate', () => {
  beforeEach(() => {
    return helpers
      .run(require.resolve('../generators/boilerplate'))
      .withOptions({ name: 'my-module' });
  });

  it('creates boilerplate files', () => {
    assert.file('src/index.js');
    assert.fileContent('src/index.js', 'module.exports = {}');
  });
});

describe('node:boilerplate', () => {
  beforeEach(() => {
    return helpers
      .run(require.resolve('../generators/boilerplate'))
      .withOptions({ name: 'my-module', generateInto: 'other/' });
  });

  it('creates boilerplate files using another path', () => {
    assert.file('other/src/index.js');
    assert.fileContent('other/src/index.js', 'module.exports = {}');
  });
});
