var mongoose = require('mongoose'),
    User = require('../server/users/userModel'),
    expect = require('chai').expect;

mongoose.connect('mongodb://localhost/tabs');

User.remove({}, function(err) {
  console.log('Database cleared');
})

describe('User Model Spec', function() {
  it('should successfully create a user', function(done) {
    User.create({email: 'kirby8u@hotmail.com', password: 'hackreactor'}, function(err, user) {
      User.findOne({email: 'kirby8u@hotmail.com'}, function(err, user) {
        expect(user.get('email')).to.eql('kirby8u@hotmail.com');
        done();
      });
    });
  });
});
