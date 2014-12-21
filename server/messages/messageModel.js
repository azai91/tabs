var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

// define message schema
var messageSchema = new Schema({
	senderId: { type: Schema.Types.ObjectId, ref: 'User' },
	recipientId: { type: Schema.Types.ObjectId, ref: 'User' },
	message: {
		type: String,
		required: true
	},
	conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' }
});

// compile message schema into a message model
module.exports = mongoose.model('Message', messageSchema);
