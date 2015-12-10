'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      required: true,
      desc: 'The new module name.'
    });

    this.option('babel', {
      required: false,
      defaults: false,
      desc: 'Compile ES2015 using Babel'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(this.options.generateInto, 'lib/index.js'), {
        babel: this.options.babel
      }
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(this.options.generateInto, 'test/index.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name),
        babel: this.options.babel
      }
    );
  }
});
