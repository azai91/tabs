var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// define conversation schema
var conversationSchema = new Schema({
  initiatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  responderId: { type: Schema.Types.ObjectId, ref: 'User' },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

// compile conversation schema into a conversation model
module.exports = mongoose.model('Conversation', conversationSchema);