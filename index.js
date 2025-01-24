import Module from 'node:module';

const require = Module.createRequire(import.meta.url);

export { default } from './generators/app/index.js';

export const app = require.resolve('./generators/app/index.js');
export const boilerplate = require.resolve('./generators/boilerplate/index.js');
export const cli = require.resolve('./generators/cli/index.js');
export const editorconfig = require.resolve('./generators/editorconfig/index.js');
export const eslint = require.resolve('./generators/eslint/index.js');
export const git = require.resolve('./generators/git/index.js');
export const readme = require.resolve('./generators/readme/index.js');
