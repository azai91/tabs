'use strict';

var React = require('react');
typeof window !== "undefined" && (window.React = React);

// var MessageAPI = require('./utils/MessageAPI');
var UserAPI = require('./utils/UserAPI');
var Router = require('react-router');
var routes = require('./routes');

UserAPI.getUserData();

// Allows home page to route to message page
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});