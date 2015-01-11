// var FluxAuthActions = require('../actions/FluxAuthActions');
var $ = require('jquery');

module.exports = {

  handleSignupSubmit: function(signupObject) {
    console.log(signupObject);
    var _this = this;
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: signupObject,
      success: function(data) {
        _this.transitionTo('app');
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  },

  handleLoginSubmit: function(loginObject) {
    console.log(loginObject);
    var _this = this;
    $.ajax({
      url: '/login',
      type: 'POST',
      data: loginObject,
      success: function(data) {
        _this.transitionTo('app');
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




// sendMessage: function(message, index) {

//   // Message needs senderID, conversationID, and recipientID
//   $.post('/messages', message, function(data) {
//     console.log('data');
//     console.log(data);
//     FluxMessageActions.sendMessage(data, index);
//   }).fail(function(err) {
//     console.log('message failed to send', err);
//   });
// }