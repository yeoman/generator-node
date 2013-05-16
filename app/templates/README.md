# <%= props.title || props.name %>

<%= props.description %>

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/<%= props.github_username %>/jquery-<%= slugname %>/master/dist/jquery.<%= slugname %>.min.js
[max]: https://raw.github.com/<%= props.github_username %>/jquery-<%= slugname %>/master/dist/jquery.<%= slugname %>.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/<%= slugname %>.min.js"></script>
<script>
jQuery(function($) {
  $.awesome(); // "awesome"
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
