'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:package', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/package'))
			.on('end', done);
	});

	it('creates package.json', function () {
		assert.file([
			'package.json'
		]);
	});
});
