'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('coveralls', {
      type: Boolean,
      required: false,
      desc: 'Send coverage reports to coveralls'
    });

    this.option('babel', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Compile ES6 using Babel'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      // Include Gulp related dev dependencies
      pkg.devDependencies = pkg.devDependencies || {};
      _.extend(pkg.devDependencies, {
        gulp: '^3.6.0',
        'gulp-exclude-gitignore': '^1.0.0',
        'gulp-istanbul': '^0.8.1',
        'gulp-jscs': '^1.1.0',
        'gulp-jshint': '^1.5.3',
        'gulp-mocha': '^2.0.0',
        'gulp-plumber': '^1.0.0',
        'jshint-stylish': '^1.0.0'
      });

      if (this.options.coveralls) {
        pkg.devDependencies['gulp-coveralls'] = '^0.1.0';
      }

      if (this.options.babel) {
        pkg.devDependencies['gulp-babel'] = '^5.1.0';
        pkg.devDependencies['babel-core'] = '^5.5.0';
      }

      // Setup testing script
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.test = 'gulp';

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function () {
      var tasks = ['static', 'test'];

      if (this.options.coveralls) {
        tasks.push('coveralls');
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'), {
          includeCoveralls: this.options.coveralls,
          babel: this.options.babel,
          tasks: '\'' + tasks.join('\', \'') + '\''
        }
      );
    },

    addDistToGitignore: function () {
      if (!this.options.babel) {
        return;
      }

      var gitignore = this.fs.read(
        this.destinationPath('.gitignore'),
        {defaults: ''}
      ).split('\n').filter(Boolean);
      gitignore.push('dist');
      this.fs.write(
        this.destinationPath('.gitignore'),
        gitignore.join('\n') + '\n'
      );
    }
  }
});
