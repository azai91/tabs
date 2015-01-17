var LocalStrategy = require('passport-local').Strategy,
    GithubStrategy = require('passport-github2').Strategy,
    User          = require('../users/userModel'),
    configAuth = require('./auth');

module.exports = function(passport) {

  //passes user id between server and client instead of entire object
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //fetches user when client sends cookie to server
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }

        //if email already in database then send message back
        if (user) {
          return done(null, false, { message: 'Email Already Used'});
        }

        // if email is not used then proocess to next
        if (!user) {
          User.create({email: email, password: password}, function(err, createdUser) {

            return done(null, createdUser);
          });
        }
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {

          //checks if password is correct
          if (user.verifyPassword(password)) {
            return done(null, user);
          }
          if (!user.verifyPassword(password)) {
            return done(null, false, { message: 'incorrect password'});
          }
        }

        //cannot find user
        if (!user) {
          return done(null, false, { message: 'cannot find user'});
        }
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {

          //checks if password is correct
          if (user.verifyPassword(password)) {
            return done(null, user);
          }
          if (!user.verifyPassword(password)) {
            return done(null, false, { message: 'incorrect password'});
          }
        }

        //cannot find user
        if (!user) {
          return done(null, false, { message: 'cannot find user'});
        }
      });
    }
  ));


  passport.use(new GithubStrategy({
      clientID: configAuth.githubAuth.clientID,
      clientSecret: configAuth.githubAuth.clientSecret,
      callbackURL: configAuth.githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  ));

};