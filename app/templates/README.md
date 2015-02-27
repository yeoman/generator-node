# <%= props.slugname %> [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> <%= props.description %>


## Install

```sh
$ npm install --save <%= slugname %>
```


## Usage

```js
var <%= safeSlugname %> = require('<%= slugname %>');

<%= safeSlugname %>('Rainbow');
```<% if (props.cli) { %>

```sh
$ npm install --global <%= slugname %>
$ <%= slugname %> --help
```<% } %><% if (props.browser) { %>

```sh
# creates a browser.js
$ npm run browser
```<% } %>


## License

<%= props.license %> © [<%= props.authorName %>](<%= props.authorUrl %>)


[npm-image]: https://badge.fury.io/js/<%= slugname %>.svg
[npm-url]: https://npmjs.org/package/<%= slugname %>
[travis-image]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>
[daviddm-image]: https://david-dm.org/<%= props.githubUsername %>/<%= slugname %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= props.githubUsername %>/<%= slugname %>
