// var FluxAuthActions = require('../actions/FluxAuthActions');
var $ = require('jquery');

module.exports = {

  handleSignupSubmit: function(signupObject, cb) {
    console.log(signupObject);
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: signupObject,
      success: function(data) {
        cb('app');
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  },

  handleLoginSubmit: function(loginObject, cb) {
    console.log(loginObject);
    $.ajax({
      url: '/login',
      type: 'POST',
      data: loginObject,
      success: function(data) {
        cb('app');
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