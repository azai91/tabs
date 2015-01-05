var Conversation = require('./conversationModel');
var messageController = require('../messages/messageController');
var userController = require('../users/userController');
var mongoose = require('mongoose');

var conversationController = {};
conversationController.getConversations = getConversations;
conversationController.saveToConversation = saveToConversation;

function saveToConversation(req, res) {

  var senderId = mongoose.Types.ObjectId(req.user._id),
      recipientId = mongoose.Types.ObjectId(req.body.recipientId),
      conversationId = mongoose.Types.ObjectId(req.body.conversationId),
      body = req.body.body;

  var message = {
    senderId: senderId,
    recipientId: recipientId,
    conversationId: conversationId,
    body: body
  };

  messageController.saveMessage(message, function(newMessage) {
    Conversation.update({_id: conversationId },
    { $push : {messages: newMessage}}, function(err, foundConversation) {
      if (err) {
        console.log('Error with updating conversation with new message', err);
      }

      // If conversation is found
      if (foundConversation) {
        res.send(parseMessage(newMessage, req.user._id, conversationId));
      }

      // did not find conversation, makes a conversation
      if (!foundConversation) {
        Conversation.create({ users: [senderId, recipientId], messages: [newMessage] }, function(err, createdConversation) {
          if (err) {
            console.log('Error creating conversation', err);
          }

          // Saves new conversationId to users
          if (createdConversation) {
            req.body.conversationId = createdConversation.id;
            userController.addConversationToUsers(req, res);
          }
        });
      }
    });
  });
}

function getConversations(req, res) {

  var userId = mongoose.Types.ObjectId(req.user._id);

  Conversation.find({users : userId})
    .populate('messages users')
    .exec(function(err, foundConversations) {
    if (err) {
      console.log('error getting conversation', err);
    }

    var conversations = foundConversations.map(function(conversation) {
      return parseConversation(conversation, userId);
    });

    res.send(conversations);
  });

}

// Converts mongoose conversations to client readable version
function parseConversation(conversation, userId) {
  var withInfo = findWithFromId(conversation.users, userId);
  var clientConversation = {};

  // Creates client conversation
  clientConversation.withName = withInfo.email;
  clientConversation.withId = withInfo.id;
  clientConversation.conversationId = conversation.id;

  clientConversation.messages = conversation.messages.map(function(message, index) {
    return parseMessage(message, userId, conversation.id);
  });

  return clientConversation;
}

// Converts mongoose messages to client readable version
function parseMessage(message, userId, conversationId) {
  var userId = mongoose.Types.ObjectId(userId);
  var clientMessage = {};

  // Creates client message
  clientMessage.body = message.body;
  clientMessage.messageId = message.id;
  clientMessage.conversationId = conversationId;
  clientMessage.senderId = message.senderId;
  clientMessage.recipientId = message.recipientId;

  // message from user, set status to sent
  if (String(message.senderId) === String(userId)) {
    clientMessage.status = 'sent';
  } else {
    clientMessage.status = 'received';
  }

  return clientMessage;
}

function findWithFromId(users, userId) {

  for (var i = 0; i < users.length; i++) {
    if (String(users[i].id) !== String(userId)) {
      // TODO: change to name isntead of email later later
      return {
        id: users[i].id,
        email: users[i].email
      };
    }
  }
}

module.exports = conversationController;