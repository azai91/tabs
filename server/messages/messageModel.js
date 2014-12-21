var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// define message schema
var messageSchema = mongoose.Schema({
	senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	message: {
		type: String,
		required: true
	},
	conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
});

// compile message schema into a message model
module.exports = mongoose.model('Message', messageSchema);
