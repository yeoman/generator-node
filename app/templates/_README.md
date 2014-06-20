# <%= props.name %> [![Build Status](https://secure.travis-ci.org/<%= props.githubUsername %>/<%= slugname %>.png?branch=master)](http://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>)

> <%= props.description %>


## Getting Started

Install the module with: `npm install <%= slugname %>`

```js
var <%= slugname %> = require('<%= slugname %>');
<%= slugname %>.awesome(); // "awesome"
```<% if (props.cli === "yes" || props.cli) { %>

Install with cli command

```sh
$ npm install -g <%= slugname %>
$ <%= slugname %> --help
$ <%= slugname %> --version
```<% } %>

<% if (props.browser === "yes") { %>
```sh
# creates a browser.js
$ grunt browserify
```
<%}%>


## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) <%= currentYear %> <%= props.authorName %>  
Licensed under the <%= props.license %> license.
