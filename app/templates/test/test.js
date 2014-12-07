/*global describe, it */
'use strict';
var assert = require('assert');
var <%= safeSlugname %> = require('../');

describe('<%= slugname %> node module', function () {
    it('must have at least one test', function () {
        <%= safeSlugname %>();
        assert(false, 'I was too lazy to write any tests. Shame on me.');
    });
});
