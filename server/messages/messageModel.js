var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// define message schema
var messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User' },
  body: {
    type: String,
    required: true
  }
});

// compile message schema into a message model
module.exports = mongoose.model('Message', messageSchema);
