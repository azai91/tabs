'use strict';

var React = require('react');
typeof window !== "undefined" && (window.React = React);

var MessageAPI = require('./utils/MessageAPI');
var Router = require('react-router');
var routes = require('./routes');

// Adds messagse to MessageStore
MessageAPI.getMessageData();

// Allows home page to route to message page
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});