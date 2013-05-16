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
  var self = this;
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
  '_Project name_ shouldn\'t contain "node" or "js" and should\n' +
  'be a unique ID not already in use at search.npmjs.org.\n' +
  '\n' +
  'You should now install project dependencies with _npm install_.\n' +
  'After that, you may execute project tasks with _grunt_. For\n' +
  'more information about installing and configuring Grunt, please see\n' +
  'the Getting Started guide:\n' +
  '\n' +
  'http://gruntjs.com/getting-started';

  console.log(welcome);

  var projectname = path.basename(process.cwd());
  var username = (process.env.USER || process.env.USERNAME || '???');

  var prompts = [{
    name: 'name',
    message: 'Project name',
    default: projectname
  }, {
    name: 'description',
    default: 'The best project ever'
  }, {
    name: 'version',
    default: '0.1.0'
  }, {
    name: 'repository',
    message: 'Project git repository',
    default: 'git://github.com/' + username + '/' + projectname + '.git'
  }, {
    name: 'homepage',
    message: 'Project homepage',
    default: 'https://github.com/' + username + '/' + projectname
  }, {
    name: 'bugs',
    message: 'Project issues tracker',
    default: 'https://github.com/' + username + '/' + projectname + '/issues'
  }, {
    name: 'license',
    default: 'MIT'
  }, {
    name: 'author_name',
    // TODO(shama): Default to Name
  }, {
    name: 'author_email',
    // TODO(shama): Default to Email
  }, {
    name: 'author_url',
    // TODO(shama): Default to homepage
  }, {
    name: 'node_version',
    message: 'What versions of node does it run on?',
    default: this.pkg.engines.node
  }, {
    name: 'main',
    message: 'Main module entry point:',
    default: 'lib/' + projectname + '.js'
  }, {
    name: 'npm_test',
    message: 'npm test command:',
    default: 'grunt nodeunit',
  }, {
    name: 'travis',
    message: 'Will this project be tested with Travis CI?',
    default: 'Y/n'
  }];

  var nameToMessage = function (name) {
    return name.split('_').map(
      function (x) { return self._.capitalize(x); }
    ).join(' ');
  };

  // Generate prompt messages if only the name is defined.
  prompts.map(function (entry) {
    if (entry.message === undefined) {
      entry.message = nameToMessage(entry.name);
    }
    entry.message = String(entry.message).grey;
    return entry;
  });

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (err, props) {
    if (err) {
      return self.emit('error', err);
    }
    self.props = props;
    // For easier access in the templates.
    self.slugname = self._.slugify(props.name);
    cb();
  });
};

NodeGenerator.prototype.dependencies = function dependencies() {
  // TODO(shama): look up latest devDeps and inject into package.json
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
