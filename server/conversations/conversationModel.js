var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// define conversation schema
var conversationSchema = mongoose.Schema({
	initiatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	responderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

// compile conversation schema into a conversation model
module.exports = mongoose.model('Conversation', conversationSchema);