'use strict';
var generators = require('yeoman-generator');
var originUrl = require('git-remote-origin-url');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      desc: 'Module name'
    });

    this.option('github-account', {
      type: String,
      desc: 'GitHub username or organization'
    });

    this.option('skip-files', {
      type: String,
      desc: 'Skip generation of .gitattributes and .gitignore'
    });

    this.option('origin-url', {
      type: String,
      desc: 'Origin URL.  Only used if there is no origin currently initialized'
    });
  },

  initializing: function () {

    if (!this.options.skipFiles) {
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath(this.options.generateInto, '.gitattributes')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath(this.options.generateInto, '.gitignore')
      );
    }

    return originUrl(this.destinationPath(this.options.generateInto))
      .then(function (url) {
        this.originUrl = url;
      }.bind(this), function () {
        this.originUrl = '';
      }.bind(this));


  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.originUrl || this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || repository;

    this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), this.pkg);
  },

  end: function () {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath(this.options.generateInto)
    });

    if (!this.originUrl) {
      var repoSSH = this.pkg.repository;
      if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }
  }
});
