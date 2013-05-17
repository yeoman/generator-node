# <%= props.name %><% if (props.travis) { %> [![Build Status](https://secure.travis-ci.org/<%= props.git_user %>/<%= props.git_repo %>.png?branch=master)](http://travis-ci.org/<%= props.git_user %>/<%= props.git_repo %>)<% } %>

<%= props.description %>

## Getting Started
Install the module with: `npm install <%= props.slugname %>`

```javascript
var <%= props.slugname %> = require('<%= props.slugname %>');
<%= props.slugname %>.awesome(); // "awesome"
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) <%= currentYear %> <%= authorName %>  
Licensed under the <%= props.licenses.join(', ') %> license<%= props.licenses.length === 1 ? '' : 's' %>.
