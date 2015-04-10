'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.option('travis', {
			type: Boolean,
			required: false,
			defaults: true,
			description: 'Include travis config'
		});
	},

	initializing: function () {
		if (this.options.travis) {
			this.composeWith('node:travis', {}, {
				local: require.resolve('../travis')
			});
		}

		this.composeWith('node:editorconfig', {}, {
			local: require.resolve('../editorconfig')
		});

		this.composeWith('node:jshint', {}, {
			local: require.resolve('../jshint')
		});

		this.composeWith('node:git', {}, {
			local: require.resolve('../git')
		});

		this.composeWith('node:jscs', {}, {
			local: require.resolve('../jscs')
		});

		this.composeWith('node:package', {}, {
			local: require.resolve('../package')
		});
	}
});
