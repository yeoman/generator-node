'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'The new module name.'
    });
  }

  writing() {
    const filepath = this.destinationPath(this.options.generateInto, 'src/index.js');

    this.fs.copyTpl(this.templatePath('index.js'), filepath);
  }
};
