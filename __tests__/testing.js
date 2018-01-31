'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('mocha:app', () => {
  describe('defaults', () => {
    beforeEach(done => {
      helpers.run(path.join(__dirname, '../generators/testing')).on('end', done);
    });

    it('creates expected files', () => {
      assert.file(['test/unit/index.spec.js', 'test/spec-helper.js']);
    });
  });
});
