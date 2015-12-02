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

    this.option('repoBaseUrl', {
      type: String,
      required: false,
      defaults: 'git@github.com:',
      desc: 'Base url of the git repository'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    });

    this.option('account', {
      type: String,
      required: true,
      desc: 'Username or organization (probably Github)'
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath(this.options.generateInto, '.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.options.generateInto, '.gitignore')
    );

    var done = this.async();

    originUrl(this.destinationPath(this.options.generateInto), function (err, url) {
      this.originUrl = url;
      done();
    }.bind(this));

  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.account + '/' + this.options.name;
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
      if (this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = this.options.repoBaseUrl + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }
  }
});
