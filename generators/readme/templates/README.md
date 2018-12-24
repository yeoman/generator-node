# <%= projectName %> [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]<%
if (includeCoveralls) { %> [![Coverage percentage][coveralls-image]][coveralls-url]<% } -%>

> <%= description %>

<% if (!content) { -%>
## Installation

```sh
$ npm install --save <%= projectName %>
```

## Usage

```js
const <%= safeProjectName %> = require('<%= projectName %>');

<%= safeProjectName %>('Rainbow');
```
<% } else { -%>
<%= content %>
<% } -%>
## License

<%= license %> © [<%= author.name %>](<%= author.url %>)


[npm-image]: https://badge.fury.io/js/<%= escapedProjectName %>.svg
[npm-url]: https://npmjs.org/package/<%= projectName %>
<<<<<<< HEAD
[travis-image]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>
=======
[travis-image]: https://travis-ci.com/<%= githubAccount %>/<%= repositoryName %>.svg?branch=master
[travis-url]: https://travis-ci.com/<%= githubAccount %>/<%= repositoryName %>
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= repositoryName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= repositoryName %>
>>>>>>> parent of eb5fef0... Revert "Merge branch 'master' into master"
<% if (includeCoveralls) { -%>
[coveralls-image]: https://coveralls.io/repos/<%= githubAccount %>/<%= repositoryName %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= githubAccount %>/<%= repositoryName %>
<% } -%>
