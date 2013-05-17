/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.author_name %>
 * Licensed under the <%= props.licenses.join(', ') %> license<%= props.licenses.length === 1 ? '' : 's' %>.
 */

'use strict';

exports.awesome = function() {
  return 'awesome';
};
