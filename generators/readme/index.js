'use strict';
var _ = require('lodash');
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'User github account'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: 'Author url'
    });

    this.option('coveralls', {
      type: Boolean,
      required: true,
      desc: 'Include coveralls badge'
    });

    this.option('content', {
      type: String,
      required: false,
      desc: 'Readme content'
    });
  },

  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      {
        projectName: this.options.name,
        safeProjectName: _.camelCase(this.options.name),
        description: this.options.description,
        githubAccount: this.options.githubAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: pkg.license,
        includeCoveralls: this.options.coveralls,
        content: this.options.content
      }
    );
  }
});
