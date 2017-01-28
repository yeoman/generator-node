#!/usr/bin/env node
'use strict';
var meow = require('meow');
var <%= pkgSafeName %> = require('./');

var cli = meow([
  'Usage',
  '  $ <%= pkgName %> [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ <%= pkgName %>',
  '  unicorns',
  '  $ <%= pkgName %> rainbows',
  '  unicorns & rainbows'
]);
