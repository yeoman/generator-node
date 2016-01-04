#!/usr/bin/env node
'use strict';
<% if (babel) { -%>
import meow from 'meow';
import <%= pkgSafeName %> from './';
<% } else { -%>
var meow = require('meow');
var <%= pkgSafeName %> = require('./');
<% } -%>

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
