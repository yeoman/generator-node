'use strict';
const Generator = require('yeoman-generator');
const originUrl = require('git-remote-origin-url');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });

    this.option('repositoryName', {
      type: String,
      required: true,
      desc: 'Name of the GitHub repository'
    });
  }

  initializing() {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath(this.options.generateInto, '.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.options.generateInto, '.gitignore')
    );

    return originUrl(this.destinationPath(this.options.generateInto)).then(
      function(url) {
        this.originUrl = url;
      }.bind(this),
      function() {
        this.originUrl = '';
      }.bind(this)
    );
  }

  _readPkg() {
    this.pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      {}
    );
  }

  writing() {
    this._readPkg();

    let repository;
    if (this.originUrl) {
      repository = this.originUrl;
    } else if (this.options.githubAccount && this.options.repositoryName) {
      repository = this.options.githubAccount + '/' + this.options.repositoryName;
    }

    this.pkg.repository = this.pkg.repository || repository;

    this.fs.writeJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      this.pkg
    );
  }

  end() {
    this._readPkg();

    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath(this.options.generateInto)
    });

    if (this.pkg.repository && !this.originUrl) {
      let repoSSH = this.pkg.repository;
      if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }
  }
};
