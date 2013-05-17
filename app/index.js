'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var prompts = require('grunt-prompts');
var async = require('async');

var NodeGenerator = module.exports = function NodeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.currentYear = (new Date()).getFullYear();
  this.props = Object.create(null);
};
util.inherits(NodeGenerator, yeoman.generators.NamedBase);

NodeGenerator.prototype.askFor = function askFor() {
  var self = this;
  var done = this.async();

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
  '\n_Project name_ shouldn\'t contain "node" or "js" and should' +
  '\nbe a unique ID not already in use at search.npmjs.org.' +
  '\n' +
  '\nYou should now install project dependencies with _npm install_.' +
  '\nAfter that, you may execute project tasks with _grunt_. For' +
  '\nmore information about installing and configuring Grunt, please see' +
  '\nthe Getting Started guide:' +
  '\n' +
  '\nhttp://gruntjs.com/getting-started';

  console.log(welcome);

  var queue = async.queue(function(rawPrompt, next) {
    prompts.default(rawPrompt, self.props, function(prompt) {
      prompt.message = String(prompt.message).grey;

      function validate(valid, value) {
        if (!valid) {
          // Print warning and requeue the current prompt
          var warning = (prompt.warning) ? prompt.warning : 'Invalid input for ' + prompt.name;
          console.log('error'.red + ': ' + warning);
          queue.unshift(rawPrompt);
          return next();
        }

        switch (prompt.name) {
          case 'name':
            self.props.slugname = self.slugname = self._.slugify(value);
            break;
          case 'author_name':
            self.authorName = value;
            break;
        }

        // Looks good, set the property
        self.props[prompt.name] = value;
        next();
      }

      // Prompt user for input and validate
      self.prompt(prompt, function(err, props) {
        if (err) { return self.emit('error', err); }
        prompts.validate(prompt, props[prompt.name], self.props, validate);
      });
    });
  }, 1);

  // Call this when the queue is done
  queue.drain = done;

  // Prompt for these values
  queue.push(prompts.defaults([
    'name',
    'description',
    'version',
    'repository',
    'homepage',
    'bugs',
    'licenses',
    'author_name',
    'author_email',
    'author_url',
    'node_version',
    'main',
    'npm_test',
  ]));
};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/name.js', 'lib/' + this.slugname + '.js');
};

NodeGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
};

NodeGenerator.prototype.licenses = function licenses() {
  var self = this;
  this.props.licenses.forEach(function(license) {
    var licensePath = prompts.availableLicenses(license);
    self.template(licensePath, 'LICENSE-' + license);
  });
};

NodeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
};
