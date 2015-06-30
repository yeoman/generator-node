# Node Generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-node.svg?branch=master)](https://travis-ci.org/yeoman/generator-node)

`generator-node` creates a base template to start a new Node.js module.

It is also easily composed into your own generators so you can only target your efforts at your generator's specific features.

Maintained by [Hemanth.HM](http://github.com/hemanth).


## Install

```
$ npm install --global generator-node
```


## Usage

```
$ yo node
```

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

That'll generate a project with all the common tools setup. This includes:

- Filled `package.json` file
- [gulp](http://gulpjs.com/) task runner
- [Babel](https://babeljs.io/) ES2015 transpiler
- [mocha](http://mochajs.org/) unit test
- [JSHint](http://jshint.com/) linting
- [JSCS](http://jscs.info/) code style checking
- [Istanbul](https://gotwarlost.github.io/istanbul/) code coverage (optionnally tracked on [Coveralls](https://coveralls.io/))
- [Travis CI](https://travis-ci.org/) continuous integration (optional)
- [License](https://spdx.org/licenses/)

### Running tests

Once the project is scaffolded, inside the project folder run:

```
$ npm test
```

You can also directly use mocha to run test on single files:

```
$ npm -g install mocha
$ mocha test/name.js
```

### Publishing your code

Once you're tests are passing (ideally with a Travis CI green run), you might be ready to publish your code to npm. We recommend you using [npm version]() to tag release correctly.

```
$ npm version major
$ git push --follow-tags
# ATTENTION: There is no turning back here.
$ npm publish
```

## Extend this generator

First of all, make sure you're comfortable with [Yeoman composability](http://yeoman.io/authoring/composability.html) feature. Then in your own generator:

```js
module.exports = generators.Base.extend({
  default: function () {
    this.composeWith('node:app', {
      options: {/* provide the options you want */}
    }, {
      local: require.resolve('generator-node/generators/app')
    });
  }
});
```

### Options

Here's a list of our supported options:

- `travis` (Boolean, default true) include or not a `.travis.yml` file.
- `boilerplate` (Boolean, default true) include or not the boilerplate files (`lib/index.js`, `test/index.js`)

### Sub generators

If you don't need all the features provided by the main generator, you can still use a limited set of features by composing with our sub generators directly.

Remember you can see the options of each sub generators by running `yo node:sub --help`.

- `node:boilerplate`
- `node:babel`
- `node:editorconfig`
- `node:git`
- `node:gulp`
- `node:jscs`
- `node:jshint`
- `node:readme`
- `node:travis`
- `node:cli`


## License

MIT © Yeoman team (http://yeoman.io)
