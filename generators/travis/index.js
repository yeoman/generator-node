'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function () {

    var shrink = this.fs.exists(this.destinationPath('npm-shrinkwrap.json'));

    this.fs.copyTpl(
      this.templatePath('travis.yml'),
      this.destinationPath('.travis.yml'), {
        shrink: shrink
      }
    );

    if (shrink) {
      this.fs.copy(
        this.templatePath('travis-caching-dependencies.sh'),
        this.destinationPath('scripts/travis-caching-dependencies.sh')
      );
    }

  }
});
