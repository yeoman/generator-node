'use strict';
var generators = require('yeoman-generator');
var extend = require('deep-extend');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('es2015', {
      required: false,
      defaults: false,
      desc: 'Allow ES2015 syntax'
    });
  },

  writing: function () {
    var eslintrc = {
      rules: {
        strict: [2, 'global'],
        quotes: [2, 'single'],
        indent: [2, 2],
        'one-var': [2, 'never'],
        'consistent-return': 0,
        'no-use-before-define': [2, 'nofunc'],
        'space-before-function-paren': [2, {anonymous: 'always', named: 'never'}]
      },
      env: {
        node: true,
        mocha: true
      }
    };

    if (this.options.es2015) {
      extend(eslintrc, {
        ecmaFeatures: {
          modules: true
        },
        env: {
          es6: true
        }
      });
    }

    this.fs.writeJSON(this.destinationPath('.eslintrc'), eslintrc);
  }
});
