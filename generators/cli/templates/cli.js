#!/usr/bin/env node
const meow = require('meow');
const <%= pkgSafeName %> = require('./');

const cli = meow(`
Usage
  $ <%= pkgName %> [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ <%= pkgName %>
  unicorns
  $ <%= pkgName %> rainbows
  unicorns & rainbows
`);
