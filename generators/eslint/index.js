
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.',
    });
  }

  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: rootPkg.devDependencies.eslint,
        prettier: rootPkg.devDependencies.prettier,
        husky: rootPkg.devDependencies.husky,
        'lint-staged': rootPkg.devDependencies['lint-staged'],
        'eslint-config-airbnb': rootPkg.devDependencies['eslint-config-airbnb'],
        'eslint-plugin-import': rootPkg.devDependencies['eslint-plugin-import'],
        'eslint-plugin-jsx-a11y': rootPkg.devDependencies['eslint-plugin-jsx-a11y'],
        'eslint-plugin-react': rootPkg.devDependencies['eslint-plugin-react'],
      },
      'lint-staged': rootPkg['lint-staged'],
      eslintConfig: rootPkg.eslintConfig,
      scripts: {
        pretest: rootPkg.scripts.pretest,
        precommit: rootPkg.scripts.precommit,
      },
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson,
    );

    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore'),
    );
  }
};
