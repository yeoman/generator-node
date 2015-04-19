'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');
var npmName = require('npm-name');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      description: 'Include travis config'
    });
  },

  initializing: function () {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: {
    askForModuleName: function () {
      var self = this;
      var done = this.async();

      var prompts = [{
        name: 'name',
        message: 'Module Name',
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: function (input) {
          return !!input.length;
        },
        when: !this.pkg.name
      }, {
        type: 'confirm',
        name: 'askAgain',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function(answers) {
          if (self.pkg.name) {
            return false;
          }

          var done = this.async();
          npmName(answers.name, function (err, available) {
            done(available);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        if (props.askAgain) {
          return this.prompting.askForModuleName();
        }

        this.props = _.extend(this.props, props);

        done();
      }.bind(this));
    },

    askFor: function () {
      var done = this.async();

      var prompts = [{
        name: 'description',
        message: 'Description',
        when: !this.pkg.description
      }, {
        name: 'homepage',
        message: 'Project homepage url',
        when: !this.pkg.homepage
      }, {
        name: 'license',
        message: 'License',
        when: !this.pkg.license,
        default: 'MIT'
      }, {
        name: 'githubUsername',
        message: 'GitHub username or organization',
        when: !this.pkg.repository
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        when: !this.pkg.author,
        store: true
      }, {
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        when: !this.pkg.keywords,
        filter: _.words
      }];

      this.prompt(prompts, function (props) {
        this.props = _.extend(this.props, props);

        if (props.githubUsername) {
          this.props.repository = props.githubUsername + '/' + this.props.name;
        }

        done();
      }.bind(this));
    }
  },

  writing: function () {
    var pkgJsonFields = {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      repository: this.props.repository,
      license: this.props.license,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      scripts: {
        test: 'mocha -R spec'
      },
      files: ['lib'],
      keywords: this.props.keywords
    };

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON('package.json', _.extend(pkgJsonFields, this.pkg));
  },

  default: function () {
    if (this.options.travis) {
      this.composeWith('node:travis', {}, {
        local: require.resolve('../travis')
      });
    }

    this.composeWith('node:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('node:jshint', {}, {
      local: require.resolve('../jshint')
    });

    this.composeWith('node:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('node:jscs', {}, {
      local: require.resolve('../jscs')
    });

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith('node:readme', {
        options: {
          name: this.props.name,
          description: this.props.description,
          githubAccount: this.props.githubAccount,
          authorName: this.props.authorName,
          authorURL: this.props.authorURL,
          license: this.props.license
        }
      }, {
        local: require.resolve('../readme')
      });
    }
  }
});
