'use strict';

const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('ui', {
      desc: 'Choose your style of test DSL for Mocha (bdd, tdd)',
      type: String
    });

    this.option('testRoot', {
      type: String,
      required: false,
      default: 'test',
      desc: 'Relative path to the test code root'
    });
  }

  prompting() {
    const done = this.async();

    const prompts = [
      {
        type: 'list',
        name: 'ui',
        message: 'Choose your style of DSL',
        choices: ['BDD', 'TDD'],
        default: 'BDD',
        when: !this.options.ui
      }
    ];

    this.prompt(prompts).then(answers => {
      this.options.ui = (this.options.ui || answers.ui).toLowerCase();
      done();
    });
  }

  configuring() {
    this.config.set('ui', this.options.ui);
  }

  writing() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const scripts = this.fs.readJSON(this.templatePath('package.json')).scripts;

    const pkg = extend(
      {
        scripts
      },
      currentPkg
    );

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copy(
      this.templatePath('spec-helper.ejs'),
      this.destinationPath(`${this.options.testRoot}/spec-helper.js`)
    );

    this.fs.copy(
      this.templatePath('test.ejs'),
      this.destinationPath(`${this.options.testRoot}/unit/index.spec.js`)
    );
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: false
      });
    }

    const dependencies = [
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai',
      'proxyquire',
      'mocha',
      'nyc'
    ];

    this.npmInstall(dependencies, { saveDev: true });
  }
};
