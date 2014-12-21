var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var Conversation = require('../conversations/conversationModel'); //do i need this for the conversation id? try without it
var User = require('../users/userModel'); //do i need this for the user id? try without it

// define message schema
var messageSchema = mongoose.Schema({
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
