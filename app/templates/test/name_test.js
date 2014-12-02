/*global describe,it*/
'use strict';
var assert = require('assert'),
  <%= safeSlugname %> = require('../lib/<%= slugname %>.js');

describe('<%= slugname %> node module', function() {
  it('must be awesome', function() {
    assert.equal( <%= safeSlugname %>.awesome(), 'awesome');
  });
});

describe('<%= slugname %> node module', function() {
  it('must have at least one test', function() {
    assert(false, 'I was too lazy to write any tests. Shame on me.');
  });
});
