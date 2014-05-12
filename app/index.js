'use strict';

var chalk = require('chalk');
var path = require('path');
var npmName = require('npm-name');
var yeoman = require('yeoman-generator');

var NodeGenerator = module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var cb = this.async();
    var log = this.log;

    log(
      this.yeoman +
      '\nThe name of your project shouldn\'t contain "node" or "js" and' +
      '\nshould be a unique ID not already in use at search.npmjs.org.');

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd()),
      filter: function (input) {
        var done = this.async();

        npmName(input, function (err, available) {
          if (!available) {
            log.info(chalk.yellow(input) + ' already exists on npm. You might want to use another name.');
          }

          done(input);
        });
      }
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'Homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }, {
      name: 'keywords',
      message: 'Key your keywords (comma to split)'
    }, {
      name: 'cli',
      message: 'Do you need cli tools?',
      default: 'yes'
    }];

    this.currentYear = (new Date()).getFullYear();

    this.prompt(prompts, function (props) {
      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(
        /-+([a-zA-Z0-9])/g,
        function (g) { return g[1].toUpperCase(); }
      );

      if(props.githubUsername){
        this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      if (!props.homepage) {
        props.homepage = this.repoUrl;
      }

      this.keywords = props.keywords.split(',');

      this.props = props;

      cb();
    }.bind(this));
  },

  configuring: function () {
    this.config.save();
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');

    this.template('_README.md', 'README.md');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');

    if (this.props.cli === 'yes' || this.props.cli) {
        this.template('_cli.js', 'cli.js');
    }
  },

  writing: function () {
    this.mkdir('lib');
    this.template('lib/name.js', 'lib/' + this.slugname + '.js');
    this.mkdir('test');
    this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
