'use strict';
var path = require('path');
var npmName = require('npm-name');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.log(
      this.yeoman +
      '\nThe name of your project shouldn\'t contain "node" or "js" and' +
      '\nshould be a unique ID not already in use at npmjs.org.');
  },
  askForModuleName: function () {
    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd()),
    }, {
      type: 'confirm',
      name: 'pkgName',
      message: 'The name above already exists on npm, choose another?',
      default: true,
      when: function(answers) {
        var done = this.async();

        npmName(answers.name, function (err, available) {
          if (!available) {
            done(true);
            return;
          }

          done(false);
        });
      }
    }];

    this.prompt(prompts, function (props) {
      if (props.pkgName) {
        return this.askForModuleName();
      }

      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
      });

      done();
    }.bind(this));
  },

  askFor: function () {
    var cb = this.async();

    var prompts = [{
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
      message: 'GitHub username or organization',
      store: true
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      store: true
    }, {
      name: 'keywords',
      message: 'Key your keywords (comma to split)'
    }, {
      type: 'confirm',
      name: 'cli',
      message: 'Do you need a CLI?'
    }, {
      type: 'confirm',
      name: 'browser',
      message: 'Do you need Browserify?'
    }];

    this.currentYear = (new Date()).getFullYear();

    this.prompt(prompts, function (props) {
      if (props.githubUsername) {
        this.repoUrl = props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      this.keywords = props.keywords.split(',').map(function (el) {
        return el.trim();
      });

      this.props = props;

      cb();
    }.bind(this));
  },


  app: function () {
    this.config.save();
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('travis.yml', '.travis.yml');

    this.template('README.md', 'README.md');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');

    if (this.props.cli) {
      this.template('cli.js', 'cli.js');
    }
  },

  projectfiles: function () {
    this.template('index.js', 'index.js');
    this.mkdir('test');
    this.template('test/test.js', 'test/test.js');
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
