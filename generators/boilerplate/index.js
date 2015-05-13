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
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('lib/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/index.js'),
      {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name),
      }
    );
  }
});
