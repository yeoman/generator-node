'use strict';
var path = require('path');
var extend = require('lodash').merge;
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

    this.option('coveralls', {
      type: Boolean,
      required: false,
      desc: 'Send coverage reports to coveralls'
    });

    this.option('babel', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Compile ES2015 using Babel'
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
          'gulp': '^3.9.0',
          'gulp-eslint': '^2.0.0',
          'gulp-exclude-gitignore': '^1.0.0',
          'gulp-line-ending-corrector': '^1.0.1',
          'gulp-istanbul': '^1.0.0',
          'gulp-mocha': '^2.0.0',
          'gulp-plumber': '^1.0.0',
          'gulp-nsp': '^2.1.0'
        },
        scripts: {
          prepublish: 'gulp prepublish',
          test: 'gulp'
        }
      });

      if (this.options.coveralls) {
        pkg.devDependencies['gulp-coveralls'] = '^0.1.0';
      }

      if (this.options.babel) {
        pkg.devDependencies['gulp-babel'] = '^6.1.2';
        pkg.devDependencies.del = '^2.0.2';
        pkg.devDependencies['babel-core'] = '^6.11.4';
        pkg.devDependencies['babel-register'] = '^6.9.0';
        pkg.devDependencies['babel-preset-es2015'] = '6.9.0';
        pkg.devDependencies.isparta = '^4.0.0';
      }

      if (this.options.cli) {
        pkg.devDependencies['gulp-line-ending-corrector'] = '^1.0.1';
      }

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    gulpfile: function () {
      var tasks = ['static', 'test'];
      var prepublishTasks = ['nsp'];

      if (this.options.coveralls) {
        tasks.push('coveralls');
      }

      if (this.options.cli) {
        prepublishTasks.push('line-ending-corrector');
      }

      if (this.options.babel) {
        prepublishTasks.push('babel');
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath(this.options.generateInto, 'gulpfile.js'),
        {
          includeCoveralls: this.options.coveralls,
          cli: this.options.cli,
          babel: this.options.babel,
          tasks: stringifyArray(tasks),
          prepublishTasks: stringifyArray(prepublishTasks),
          projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
        }
      );
    },

    babel: function () {
      if (!this.options.babel) {
        return;
      }

      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath(this.options.generateInto, '.babelrc')
      );

      // Add dist/ to the .gitignore file
      var gitignore = this.fs.read(
        this.destinationPath(this.options.generateInto, '.gitignore'),
        {defaults: ''}
      ).split('\n').filter(Boolean);
      gitignore.push('dist');
      this.fs.write(
        this.destinationPath(this.options.generateInto, '.gitignore'),
        gitignore.join('\n') + '\n'
      );
    }
  }
});

function stringifyArray(arr) {
  return '[\'' + arr.join('\', \'') + '\']';
}
