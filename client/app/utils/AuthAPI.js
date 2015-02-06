// var FluxAuthActions = require('../actions/FluxAuthActions');
var $ = require('jquery');

module.exports = {

  handleLogin: function() {
    // var _this = this;
    $.ajax({
      url: '/auth/github',
      type: 'GET',
      success: function(data) {
        console.log('data', data);
        // _this.transitionTo('app');
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  },

  logout: function() {
    var _this = this;
    // this.transitionTo('messages');
    $.ajax({
      url: '/auth/logout',
      type: 'GET',
      success: function(data) {
        console.log('logout successful');
        // _this.replaceWith('/');
        window.location = '/';
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  }

};