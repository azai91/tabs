var Conversation = require('./conversationModel');

var ConversationController = {};
ConversationController.getConversations = getConversations;
ConversationController.saveToConversation = saveToConversation;

// returns an array of all conversations that the user is a part of
function getConversations(req, res){
  var userId = req.user.id; //need to look at

// query for all conversations where the user is the initiator or the responder, send all of the messages back
  Conversation.find( { $or: [ { initiator: userId }, { responder: userId } ] }, function(err, results) {
    res.end(results);
  });
};

function saveToConversation(req, res) {
  var senderId = req.body.senderId,
      recipientId = req.body.recipientId,
      newMessageId = req.body.newMessageId;
  Conversation.update({ $or: [
    { $and: [ { initiator: senderId }, { responder: recipientId } ] },
    { $and: [ { initiator: recipientId }, { responder: senderId } ] }
    ] },
    { $push: { messages: newMessageId } },
    function(err, numberAffected, raw) {
      if (err) throw err; //not sure what to do with error
  });
}

module.exports = ConversationController;