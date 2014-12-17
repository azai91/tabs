var mongoose = require('mongoose')
		bcrypt   = require('bcrypt-nodejs');

// define user schema
var userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	status: {
		type: String,
	},
	offerings: [],
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now
	}
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


