'use strict';
var generators = require('yeoman-generator');
var npmName = require('npm-name');
var path = require('path');
var slugify = require("underscore.string/slugify");

module.exports = generators.Base.extend({
	askForModuleName: function () {
		var done = this.async();

		var prompts = [{
			name: 'name',
			message: 'Module Name',
			default: path.basename(process.cwd()),
		}, {
			type: 'confirm',
			name: 'pkgName',
			message: 'The name above already exists on npm, choose another?',
			default: true,
			when: function(answers) {
				var done = this.async();

				npmName(answers.name, function (err, available) {
					if (!available) {
						done(true);
						return;
					}
					done(false);
				});
			}
		}];

		this.prompt(prompts, function (props) {
			if (props.pkgName) {
				return this.askForModuleName();
			}
			this.slugname = slugify(props.name);
			this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function(
				g) {
				return g[1].toUpperCase();
			});

			done();
		}.bind(this));
	},

	askFor: function () {
		var done = this.async();

		var prompts = [{
			name: 'description',
			message: 'Description',
			default: 'The best module ever.'
		}, {
			name: 'homepage',
			message: 'Homepage'
		}, {
			name: 'license',
			message: 'License',
			default: 'MIT'
		}, {
			name: 'githubUsername',
			message: 'GitHub username or organization',
			store: true
		}, {
			name: 'authorName',
			message: 'Author\'s Name',
			store: true
		}, {
			name: 'authorEmail',
			message: 'Author\'s Email',
			store: true
		}, {
			name: 'authorUrl',
			message: 'Author\'s Homepage',
			store: true
		}, {
			name: 'keywords',
			message: 'Key your keywords (comma to split)'
		}];

		this.currentYear = (new Date()).getFullYear();

		this.prompt(prompts, function (props) {
      this.props = props;
			if (props.githubUsername) {
				this.props.repoUrl = props.githubUsername + '/' + this.slugname;
			} else {
				this.props.repoUrl = 'user/repo';
			}

			this.props.keywords = props.keywords.split(',').map(function(el) {
				return el.trim();
			});

			done();
		}.bind(this));
	},
  initializing: function () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    // We are reaching here even before the askFor is done!
    this.fs.writeJSON('package.json', pkg);
    this.fs.copyTpl('package.json', 'package.json', this.props);
  }
});
