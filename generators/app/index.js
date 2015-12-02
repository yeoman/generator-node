'use strict';
var _ = require('lodash');
var extend = require('deep-extend');
var generators = require('yeoman-generator');
var parseAuthor = require('parse-author');
var githubUsername = require('github-username');
var path = require('path');
var askName = require('inquirer-npm-name');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include travis config'
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include boilerplate files'
    });

    this.option('babel', {
      type: Boolean,
      required: false,
      desc: 'Compile ES2015 using Babel'
    });

    this.option('cli', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Add a CLI'
    });

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('projectRoot', {
      type: String,
      required: false,
      defaults: 'lib',
      desc: 'Relative path to the project code root'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert in the README.md file'
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      babel: Boolean(this.options.babel)
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: {
    askForModuleName: function () {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
        return;
      }

      var done = this.async();

      askName({
        name: 'name',
        message: 'Module Name',
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: function (str) {
          return str.length > 0;
        }
      }, this, function (name) {
        this.props.name = name;
        done();
      }.bind(this));
    },

    askFor: function () {
      var done = this.async();

      var prompts = [{
        name: 'description',
        message: 'Description',
        when: !this.props.description
      }, {
        name: 'homepage',
        message: 'Project homepage url',
        when: !this.props.homepage
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      }, {
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        when: !this.props.authorUrl,
        store: true
      }, {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.pkg.keywords,
        filter: _.words
      }, {
        name: 'babel',
        type: 'confirm',
        message: 'Use es2015 (precompiled with Babel)',
        when: this.options.babel === undefined
      }, {
        name: 'includeCoveralls',
        type: 'confirm',
        message: 'Send coverage reports to coveralls',
        when: this.options.coveralls === undefined
      }];

      this.prompt(prompts, function (props) {
        this.props = extend(this.props, props);
        done();
      }.bind(this));
    },

    askForGithubAccount: function () {
      var done = this.async();

      githubUsername(this.props.authorEmail, function (err, username) {
        this.prompt({
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }, function (prompt) {
          this.props.githubAccount = prompt.githubAccount;
          done();
        }.bind(this));
      }.bind(this));
    }
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [
        this.props.babel ? 'dist' : this.options.projectRoot
      ],
      main: this.props.babel ? 'dist/index.js' : path.join(
        this.options.projectRoot,
        'index.js'
      ),
      keywords: this.props.keywords
    };

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON('package.json', extend(pkg, currentPkg));
  },

  default: function () {
    if (this.options.travis) {
      this.composeWith('travis', {}, {
        local: require.resolve('generator-travis/generators/app')
      });
    }

    this.composeWith('node:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('node:eslint', {
      options: {
        es2015: this.props.babel
      }
    }, {
      local: require.resolve('../eslint')
    });

    this.composeWith('node:git', {
      options: {
        name: this.props.name,
        account: this.props.githubAccount
      }
    }, {
      local: require.resolve('../git')
    });

    this.composeWith('node:gulp', {
      options: {
        coveralls: this.props.includeCoveralls,
        babel: this.props.babel,
        projectRoot: this.options.projectRoot
      }
    }, {
      local: require.resolve('../gulp')
    });

    if (this.options.boilerplate) {
      this.composeWith('node:boilerplate', {
        options: {
          name: this.props.name,
          babel: this.props.babel
        }
      }, {
        local: require.resolve('../boilerplate')
      });
    }

    if (this.options.cli) {
      this.composeWith('node:cli', {
        options: {
          babel: this.props.babel
        }
      }, {
        local: require.resolve('../cli')
      });
    }

    if (!this.pkg.license) {
      this.composeWith('license', {
        options: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith('node:readme', {
        options: {
          name: this.props.name,
          description: this.props.description,
          githubAccount: this.props.githubAccount,
          authorName: this.props.authorName,
          authorUrl: this.props.authorUrl,
          coveralls: this.props.includeCoveralls,
          content: this.options.readme
        }
      }, {
        local: require.resolve('../readme')
      });
    }
  },

  installing: function () {
    this.npmInstall();
  }
});
