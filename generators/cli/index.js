'use strict';
var _ = require('lodash');
var extend = _.merge;
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        bin: 'lib/cli.js',
        dependencies: {
          meow: '^3.7.0'
        }
      });

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    cli: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'));
      this.fs.copyTpl(
        this.templatePath('cli.js'),
        this.destinationPath(this.options.generateInto, 'lib/cli.js'), {
          pkgName: pkg.name,
          pkgSafeName: _.camelCase(pkg.name)
        }
      );
    }
  }
});
