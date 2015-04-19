'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('node:travis', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorURL: 'http://yeoman.io',
        license: 'MIT'
      })
      .on('end', done);
  });

  it('creates and fill contents in README.md', function () {
    assert.file('README.md');
    assert.fileContent('README.md', 'var myProject = require(\'my-project\');');
    assert.fileContent('README.md', '> a cool project');
    assert.fileContent('README.md', '$ npm install --save my-project');
    assert.fileContent('README.md', 'MIT © [Yeoman](http://yeoman.io)');
    assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg?branch=master');
  });
});
