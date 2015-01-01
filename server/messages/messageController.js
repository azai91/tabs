var Message = require('./messageModel');
var userController = require('../users/userController');
// var Q = require('q');

var messageController = {};
messageController.saveMessage = saveMessage;

function saveMessage(message, callback) {

  // Message needs to contain senderID, recepientID, body, conversationID
  Message.create(message, function(err, createdMessage) {
    if (err) {
      console.log('error saving Message', err);
    }
    callback(createdMessage);
  });

};

module.exports = messageController;