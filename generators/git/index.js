'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('repository-path', {
      type: String,
      required: false,
      desc: 'Path to the repository'
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
  },

  end: function () {
    this.spawnCommandSync('git', ['init']);

    if (!this.options.repositoryPath) {
      var repoSSH = 'git@github.com:' + this.options.repositoryPath + '.git';
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH]);
    }
  }
});
