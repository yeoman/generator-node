'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:editorconfig', () => {
  it('creates .editorconfig', () => {
    return helpers
      .run(require.resolve('../generators/editorconfig'))
      .then(() => assert.file('.editorconfig'));
  });

  it('respect --generate-into option', () => {
    return helpers
      .run(require.resolve('../generators/editorconfig'))
      .withOptions({ generateInto: 'other/' })
      .then(() => assert.file('other/.editorconfig'));
  });
});
