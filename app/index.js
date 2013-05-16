'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NodeGenerator = module.exports = function NodeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(NodeGenerator, yeoman.generators.NamedBase);

NodeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n' +
  '\n' +
  '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.' +
  '\n\n' +
  'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

  console.log(welcome);

  var prompts = [{
    name: 'name',
    message: 'Project Name:',
    // TODO: default to folder name
  }, {
    name: 'description',
    default: 'The best project ever.'
  }, {
    name: 'version',
    default: '0.1.0'
  }, {
    name: 'repository',
    message: 'Project git repository'
    // TODO: Default to git://github.com/[username]/[projectname].git
  }, {
    name: 'homepage',
    message: 'Project homepage'
    // TODO: Default to https://github.com/[username]/[projectname]
  }, {
    name: 'bugs',
    message: 'Project issues tracker'
    // TODO: Default to https://github.com/[username]/[projectname]/issues
  }, {
    name: 'license',
    default: 'MIT'
  }, {
    name: 'author_name',
    // TODO: Default to Name
  }, {
    name: 'author_email',
    // TODO: Default to Email
  }, {
    name: 'author_url',
    // TODO: Default to homepage
  }, {
    name: 'node_version',
    message: 'What versions of node does it run on?',
    default: '>= 0.10.0'
  }, {
    name: 'main',
    message: 'Main module entry point:',
    default: 'lib/',
    // TODO: default to project name
  }, {
    name: 'npm_test',
    message: 'npm test command:',
    default: 'grunt nodeunit',
  }, {
    name: 'travis',
    message: 'Will this project be tested with Travis CI?'
  }];

  var nameToMessage = function (name) {
    return name.split('_').map(
      function (x) { return this._.capitalize(x); }.bind(this)
    ).join(' ') + ':';
  }.bind(this);

  // Generate prompt messages if only the name is defined.
  prompts.map(function (entry) {
    if (entry.message === undefined) {
      entry.message = nameToMessage(entry.name);
    }
    return entry;
  });

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.props = props;
    // For easier access in the templates.
    this.slugname = this._.slugify(props.name);
    cb();
  }.bind(this));
};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/name.js', 'lib/' + this.slugname + '.js');
};

NodeGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
};

NodeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
};
