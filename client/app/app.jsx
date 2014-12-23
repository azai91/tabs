'use strict';

var React = require('react');
typeof window !== "undefined" && (window.React = React);
var MessageAPI = require('./utils/MessageAPI');
var FluxMessageApp = require('./components/FluxMessageApp.react');

MessageAPI.getMessageData();

React.render(
  <FluxMessageApp/>,
  document.body
);