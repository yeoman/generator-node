'use strict';
var Generator = require('yeoman-generator');
var rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });
  }

  writing() {
    var pkgJson = {
      devDependencies: {
        eslint: rootPkg.devDependencies.eslint,
        'eslint-config-xo-space': rootPkg.devDependencies['eslint-config-xo-space']
      },
      eslintConfig: {
        extends: 'xo-space',
        env: {
          jest: true,
          node: true
        }
      },
      scripts: {
        pretest: 'eslint **/*.js --fix'
      }
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    );
  }
};
