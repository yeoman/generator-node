'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  }
});
