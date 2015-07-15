'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      required: true,
      desc: 'The new module name.'
    });

    this.option('babel', {
      required: false,
      defaults: false,
      desc: 'Compile ES6 using Babel'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('lib/index.js'), {
        babel: this.options.babel
      }
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/index.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name),
        babel: this.options.babel
      }
    );
  }
});
