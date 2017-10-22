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
          desc: this.t('generateInto')
        });

        this.option('name', {
          type: String,
          required: true,
          desc: this.t('moduleName')
        });

        this.option('github-account', {
          type: String,
          required: true,
          desc: this.t('githubAccount')
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

    writing() {
      this.pkg = this.fs.readJSON(
        this.destinationPath(this.options.generateInto, 'package.json'),
        {}
      );

      let repository = '';
      if (this.originUrl) {
        repository = this.originUrl;
      } else {
        repository = this.options.githubAccount + '/' + this.options.name;
      }

      this.pkg.repository = this.pkg.repository || repository;

      this.fs.writeJSON(
        this.destinationPath(this.options.generateInto, 'package.json'),
        this.pkg
      );
    }

    end() {
      this.spawnCommandSync('git', ['init', '--quiet'], {
        cwd: this.destinationPath(this.options.generateInto)
      });

      if (!this.originUrl) {
        let repoSSH = this.pkg.repository;
        if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
          repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
        }
        this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
          cwd: this.destinationPath(this.options.generateInto)
        });
      }
    }
}
