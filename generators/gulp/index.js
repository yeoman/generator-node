'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('coveralls', {
      type: Boolean,
      required: false,
      defaults: undefined,
      description: 'Send coverage reports to coveralls'
    });
  },

  prompting: function () {
    this.prompt([{
      name: 'includeCoveralls',
      type: 'confirm',
      message: 'Send coverage reports to coveralls',
      when: this.options.coveralls == null
    }], function (props) {
      this.props = props;
      if (this.options.coveralls != null) {
        this.props.includeCoveralls = this.options.coveralls;
      }
    }.bind(this));
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      // Include Gulp related dev dependencies
      pkg.devDependencies = pkg.devDependencies || {};
      _.extend(pkg.devDependencies, {
        'gulp': '^3.6.0',
        'gulp-eslint': '^0.8.0',
        'gulp-istanbul': '^0.8.1',
        'gulp-jscs': '^1.1.0',
        'gulp-jshint': '^1.5.3',
        'gulp-mocha': '^2.0.0',
        'gulp-plumber': '^1.0.0',
        'jshint-stylish': '^1.0.0'
      });
      if (this.props.includeCoveralls) {
        pkg.devDependencies['gulp-coveralls'] = '^0.1.0';
      }

      // Setup testing script
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.test = 'gulp';

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function () {
      var tasks = ['static', 'test'];
      if (this.props.includeCoveralls) {
        tasks.push('coveralls');
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          includeCoveralls: this.props.includeCoveralls,
          tasks: tasks.join(', ')
        }
      );
    }
  }
});
