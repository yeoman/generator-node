'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'The module name'
    });

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

      pkg.devDependencies = pkg.devDependencies || {};

      _.extend(pkg.devDependencies, {meow: '^3.3.0'});
      _.extend(pkg, {
        bin: this.options.babel ? 'dist/cli.js' : 'lib/cli.js'
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    cli: function () {
      this.fs.copyTpl(
        this.templatePath('cli.js'),
        this.destinationPath('lib/cli.js'), {
          pkgSafeName: _.camelCase(this.options.name),
          babel: this.options.babel
        }
      );
    }
  }
});
