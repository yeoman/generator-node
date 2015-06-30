#!/usr/bin/env node
'use strict';
<% if (babel) { -%>
import meow from 'meow';
import <%= pkgSafeName %> from './';
import pkg from '../';
<% } else { -%>
var meow = require('meow');
var <%= pkgSafeName %> = require('./');
var pkg = require('../');
<% } -%>

var cli = meow({
  pkg: pkg,
  help: [
    'Usage',
    '  $ <%= pkgSafeName %> [input]',
    '',
    'Examples',
    '  $ <%= pkgSafeName %>',
    '  unicorns',
    '',
    '  $ <%= pkgSafeName %> rainbows',
    '  unicorns & rainbows',
    '',
    'Options',
    ' --foo Lorem ipsum. Default: false'
  ]
});
