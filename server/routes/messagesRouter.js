var express                = require('express'),
    userController         = require('../users/userController'),
    conversationController = require('../conversations/conversationController');

var messagesRouter = express.Router();

messagesRouter.route('/')
  .get(userController.isLoggedIn, conversationController.getConversations) // returns conversations array for the user
  .post(userController.isLoggedIn, conversationController.saveToConversation); // adds incoming message to database if user is logged in

module.exports = messagesRouter;