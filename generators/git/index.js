'use strict';
var generators = require('yeoman-generator');
var originUrl = require('git-remote-origin-url');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    });

    this.option('github-account', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    var done = this.async();

    originUrl(this.destinationPath(), function (err, url) {
      this.originUrl = url;
      done();
    }.bind(this));

  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || repository;

    this.fs.writeJSON('package.json', this.pkg);
  },

  end: function () {
    this.spawnCommandSync('git', ['init']);

    if (!this.originUrl) {
      var repoSSH = this.pkg.repository;
      if (this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH]);
    }
  }
});
