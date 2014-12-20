var mongoose = require('mongoose');
var Conversation = require('../conversations/conversationModel'); //do i need this for the conversation id? try without it
var User = require('../users/userModel'); //do i need this for the user id? try without it

// define message schema
var messageSchema = mongoose.Schema({
	sender: { type: Schema.Types.ObjectId, ref: 'User' },
	recipient: { type: Schema.Types.ObjectId, ref: 'User' },
	message: {
		type: String,
		required: true
	},
	conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation' }
});

// compile message schema into a message model
module.exports = mongoose.model('Message', messageSchema);
