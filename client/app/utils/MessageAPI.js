var FluxMessageActions = require('../actions/FluxMessageActions');
var SampleMessages = require('../SampleMessages');
var $ = require('jquery');

module.exports = {
  getMessageData: function() {

    $.get('/messages', function(messages) {
      console.log('messages', messages);
      FluxMessageActions.receiveMessages(messages);
    });


    // FluxMessageActions.receiveMessages(SampleMessages);
  },

  sendMessage: function(message, index) {

    // some ajax reques that will return a success call
    //$.post('/message', data)

    // Message needs senderID, conversationID, and recipientID
    $.post('/messages', message, function(data) {
      FluxMessageActions.sendMessage(message, index);
    });
  }
};


