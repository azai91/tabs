var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	SALT_WORK_FACTOR = 10;

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
  bcrypt.compareSync(candidatePassword, this.password, function(err, isMatch) {
    if (err) {throw err};
    return isMatch;
  });
};


// generates and saves a hashed password for new users
userSchema.pre('save', function(next){

	// generate salt using bcrypt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err);
		}

		// hash the password and store the hashed password
		bcrypt.hash(this.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	})
});

// compile user schema into a user model
var User = mongoose.model('User', userSchema);

module.exports = User;
