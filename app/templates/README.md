# <%= props.slugname %> [![Build Status](https://secure.travis-ci.org/<%= props.githubUsername %>/<%= slugname %>.png?branch=master)](http://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>)

> <%= props.description %>


## Install

```sh
$ npm install --save <%= slugname %>
```


## Usage

```js
var <%= slugname %> = require('<%= slugname %>');

<%= slugname %>('Rainbow');
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

MIT © [<%= props.authorName %>](<%= props.authorUrl %>)
