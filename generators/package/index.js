'use strict';
var generators = require('yeoman-generator');
var npmName = require('npm-name');
var path = require('path');
var slugify = require("underscore.string/slugify");

module.exports = generators.Base.extend({
	initializing: function () {
		this.fs.copy(
			this.templatePath('_package.json'),
			this.destinationPath('package.json')
		);
	},
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
		var cb = this.async();

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
		}, {
			type: 'confirm',
			name: 'cli',
			message: 'Do you need a CLI?'
		}, {
			type: 'confirm',
			name: 'browser',
			message: 'Do you need Browserify?'
		}];

		this.currentYear = (new Date()).getFullYear();

		this.prompt(prompts, function (props) {
			if (props.githubUsername) {
				this.repoUrl = props.githubUsername + '/' + this.slugname;
			} else {
				this.repoUrl = 'user/repo';
			}

			this.keywords = props.keywords.split(',').map(function(el) {
				return el.trim();
			});

			this.props = props;

			cb();
		}.bind(this));
	}
});
