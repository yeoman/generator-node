'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('babel', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'pre-compile with Babel'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      pkg.dependencies = pkg.dependencies || {};

      _.extend(pkg.dependencies, {meow: '^3.3.0'});
      _.extend(pkg, {
        bin: this.options.babel ? 'dist/cli.js' : 'lib/cli.js'
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    cli: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'));
      this.fs.copyTpl(
        this.templatePath('cli.js'),
        this.destinationPath('lib/cli.js'), {
          pkgSafeName: _.camelCase(pkg.name),
          babel: this.options.babel
        }
      );
    }
  }
});
