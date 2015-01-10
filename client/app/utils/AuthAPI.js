// var FluxAuthActions = require('../actions/FluxAuthActions');
var $ = require('jquery');

module.exports = {

  handleSignupSubmit: function(signupObject) {
    console.log(signupObject);
    console.log(JSON.stringify(signupObject));
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: signupObject,
      success: function(data) {
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  },

  handleLoginSubmit: function(loginObject) {
    console.log(loginObject);
    console.log(JSON.stringify(loginObject));
    $.ajax({
      url: '/login',
      type: 'POST',
      data: loginObject,
      success: function(data) {
        console.log(data);
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