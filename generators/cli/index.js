'use strict';
var _ = require('lodash');
var extend = _.merge;
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

    this.option('babel', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'pre-compile with Babel'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        bin: this.options.babel ? 'dist/cli.js' : 'lib/cli.js',
        dependencies: {
          meow: '^3.3.0'
        }
      });

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    cli: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'));
      this.fs.copyTpl(
        this.templatePath('cli.js'),
        this.destinationPath(this.options.generateInto, 'lib/cli.js'), {
          pkgSafeName: _.camelCase(pkg.name),
          babel: this.options.babel
        }
      );
    }
  }
});
