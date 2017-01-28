'use strict';
var path = require('path');
var extend = require('lodash').merge;
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

    this.option('cli', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Add a CLI'
    });

    this.option('projectRoot', {
      type: String,
      required: true,
      desc: 'Relative path to the project code root'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        devDependencies: {
          gulp: '3.9.1',
          'gulp-exclude-gitignore': '^1.0.0',
          'gulp-istanbul': '^1.1.1',
          'gulp-line-ending-corrector': '^1.0.1',
          'gulp-mocha': '^3.0.1',
          'gulp-plumber': '^1.1.0'
        },
        scripts: {
          prepublish: 'gulp prepublish',
          test: 'gulp'
        }
      });

      if (this.options.cli) {
        pkg.devDependencies['gulp-line-ending-corrector'] = '^1.0.1';
      }

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    gulpfile: function () {
      var tasks = ['test'];
      var prepublishTasks = [];

      if (this.options.cli) {
        prepublishTasks.push('line-ending-corrector');
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath(this.options.generateInto, 'gulpfile.js'),
        {
          cli: this.options.cli,
          tasks: stringifyArray(tasks),
          prepublishTasks: stringifyArray(prepublishTasks),
          projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
        }
      );
    }
  }
});

function stringifyArray(arr) {
  return '[\'' + arr.join('\', \'') + '\']';
}
