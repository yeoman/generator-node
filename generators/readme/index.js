'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      description: 'Project name'
    });

    this.option('description', {
      type: String,
      required: true,
      description: 'Project description'
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      description: 'User github account'
    });

    this.option('authorName', {
      type: String,
      required: true,
      description: 'Author name'
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      description: 'Author url'
    });

    this.option('license', {
      type: String,
      required: true,
      description: 'Project license'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.options.name,
        safeProjectName: _.camelCase(this.options.name),
        description: this.options.description,
        githubAccount: this.options.githubAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorURL
        },
        license: this.options.license
      }
    );
  }
});
