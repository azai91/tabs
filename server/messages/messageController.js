var Message = require('./messageModel');

var messageController = {};
messageController.saveMessage = saveMessage;

//formatting of what's in req important
function saveMessage(req, res, next) {
  var senderId = req.body.senderId,
      recipientId = req.body.recipientId,
      message = req.body.message,
      conversationId = req.body.conversationId;

  Message.create({
    senderId: senderId,
    recipientId: recipientId,
    message: message,
    conversationId: conversationId
  }, function(err, newMessage) {
    if (err) {
      throw err;
    } else {
      req.body.newMessageId = newMessage._id;
      next();
    }
  });
};

module.exports = messageController;