'use strict';
<% if (babel) { -%>
import assert from 'assert';
import <%= pkgSafeName %> from '../lib';
<% } else { -%>
var assert = require('assert');
var <%= pkgSafeName %> = require('../lib');
<% } -%>

describe('<%= pkgName %>', function () {
  it('should have unit test!', function () {
    assert(false, 'we expected this package author to add actual unit tests.');
  });
});
