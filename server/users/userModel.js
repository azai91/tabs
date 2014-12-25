var mongoose = require('mongoose')
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

// define user schema
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  status: String,
  skills: [],
  interests: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
});

// checks if the user-input password is correct, returns a boolean
userSchema.methods.verifyPassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

// generates and saves a hashed password for new users
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password);
  this.password = hash;
  next();
});

// compile user schema into a user model
module.exports = mongoose.model('User', userSchema);


