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

    this.option('es2015', {
      required: false,
      default: false,
      desc: 'Allow ES2015 syntax'
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
          mocha: true
        }
      },
      scripts: {
        pretest: 'eslint **/*.js --fix'
      }
    };

    if (this.options.es2015) {
      pkgJson.devDependencies['babel-eslint'] = rootPkg.devDependencies['babel-eslint'];
      pkgJson.devDependencies['eslint-plugin-babel'] = rootPkg.devDependencies['eslint-plugin-babel'];
    }

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    );
  }
};
