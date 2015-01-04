var FluxMessageActions = require('../actions/FluxMessageActions');
var SampleMessages = require('../SampleMessages');
var $ = require('jquery');

module.exports = {

  getMessageData: function() {
    $.get('/messages', function(messages) {
      FluxMessageActions.receiveMessages(messages);
    }).fail(function(err) {
      console.log('failed to retrieve conversation', err);
    });
  },

  sendMessage: function(message, index) {

    // Message needs senderID, conversationID, and recipientID
    $.post('/messages', message, function(data) {
      console.log('data');
      console.log(data);
      FluxMessageActions.sendMessage(data, index);
    }).fail(function(err) {
      console.log('message failed to send', err);
    });
  }
};


