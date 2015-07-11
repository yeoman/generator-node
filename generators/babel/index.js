'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: function () {
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );

    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.script = pkg.script || {};
    pkg.script.prepublish = 'gulp babel';

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
});
