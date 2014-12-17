//need User Model. User instance needs to have a verifyPassword method

var LocalStrategy = require('passport-local').Strategy,
    User = require(''), //REFERENCE USER

module.exports = function (passport) {

  //passes user id between server and client instead of entire object
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  //fetches user when client sends cookie to server
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if (err) {
          return done(err);
        }

        //if email already in database then send message back
        if (email) {
          return done(null, null, { message: 'Email Already Used'});
        }

        // if email is not used then proocess to next
        if (!email) {
          return done(null, user);
        }
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {

          //checks if password is correct
          if (user.verifyPassword(password)) {
            return done(null, user);
          }
          if (!user.verifyPassword(password)) {
            return done(null, null, { message: 'incorrect password'});
          }
        }

        //cannot find user
        if (!user) {
          return done(null, null, { message: 'cannot find user'});
        }
      });
    }
  ));
};