'use strict';
var Generator = require('yeoman-generator');
var rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  }

  writing() {
    this.fs.extendJSON(this.destinationPath(this.options.generateInto, 'package.json'), {
      devDependencies: {
        nsp: rootPkg.devDependencies.nsp
      },
      scripts: {
        prepublish: 'nsp'
      }
    });
  }
};
