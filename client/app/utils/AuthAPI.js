// var FluxAuthActions = require('../actions/FluxAuthActions');
var $ = require('jquery');

module.exports = {

  logout: function() {
    var _this = this;
    // this.transitionTo('messages');
    $.ajax({
      url: '/logout',
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