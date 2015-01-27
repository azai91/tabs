var LocalStrategy   = require('passport-local').Strategy,
    GithubStrategy  = require('passport-github2').Strategy,
    User            = require('../users/userModel'),
    configAuth      = require('./auth');

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

  passport.use(new GithubStrategy({
      clientID: configAuth.githubAuth.clientID,
      clientSecret: configAuth.githubAuth.clientSecret,
      callbackURL: configAuth.githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      var fullName = profile.displayName,
          githubId = profile.id,
          firstName = fullName.split(' ').slice(0, 1).join(' '),
          lastName = fullName.split(' ').slice(-1).join(' '),
          email = profile.emails[0].value;
      
      User.findOne({githubId: githubId}, function(err, user) {
        if (err) {
          return done(err);
        }

        //if email already in database then send message back
        if (user) {
          return done(null, false, { message: 'User Already Exists'});
        }

        // if email is not used then proocess to next
        if (!user) {
          User.create({
            githubId: githubId,
            email: email,
            firstName: firstName,
            lastName: lastName
          }, function(err, createdUser) {
            return done(null, createdUser);
          });
        }
      });
    }
  ));
};