/*global describe,it*/
'use strict';
var assert = require('assert'),
  <%= safeSlugname %> = require('../lib/<%= slugname %>.js');

describe('<%= slugname %> node module.', function() {
  it('must be awesome', function() {
    assert( <%= safeSlugname %> .awesome(), 'awesome');
  });
});
