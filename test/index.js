'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var yeoman = require('yeoman-generator');

var Generator = require('../generators/app/index.js');

describe('node:app', function () {

  beforeEach(function() {
    sinon.stub(yeoman.generators.Base, 'apply');
  });

  afterEach(function() {
    yeoman.generators.Base.apply.restore();
  });

  describe('constructor', function () {

    it('should define options', function() {
      var context = {
        option: sinon.stub()
      };

      Generator.prototype.constructor.call(context);

      yeoman.generators.Base.apply.should.have.been.called;

      context.option.should.have.been.calledWith('travis');
      context.option.should.have.been.calledWith('boilerplate');
      context.option.should.have.been.calledWith('babel');
      context.option.should.have.been.calledWith('cli');
      context.option.should.have.been.calledWith('name');
    });
  });

  describe('initializing', function () {

    it('should pre set the default props from "package.json"', function() {
      var context = {
        fs: {
          readJSON: sinon.stub().returns({
            name: 'generator-unicorn',
            description: 'A unicorn generator',
            version: '1.2.3',
            homepage: 'http://unicorn.io',
            repository: 'unicorn/generator-node',
            author: 'Unicorn team'
          })
        },
        options: {
          babel: true
        },
        destinationPath: sinon.stub().returns('path/of/destination')
      };

      Generator.prototype.initializing.call(context);

      context.fs.readJSON.should.have.been.called;
      context.destinationPath.should.have.been.called;
      context.props.should.be.deep.equal({
        name: 'generator-unicorn',
        description: 'A unicorn generator',
        version: '1.2.3',
        homepage: 'http://unicorn.io',
        repository: 'unicorn/generator-node',
        authorEmail: '',
        authorName: 'Unicorn team',
        authorUrl: '',
        babel: true
      });
    });
  });

});
