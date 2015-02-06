var express         = require('express'),
    userController  = require('../users/userController');

var authRouter = express.Router();

authRouter.route('/logout')
  .get(userController.logout); // logs user out using passports .logout() functionality

// Github Authentication
authRouter.get('/github', passport.authenticate('github', { scope: [ 'user', 'repo'] })); // handle the github authentication, define scopes to which we want access
authRouter.get('/github/callback', function(req, res, next) { // handle the callback after github has authenticated the user
  console.log("req", req.body);
  passport.authenticate('github', function(err, user, info) {
    if (err) { console.log('ERROR!!!!'); return next(err); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('logged in successfully'); //redirect to homepage
      if (!user.oldUser) { next(); }
      else {
        res.redirect('/')
      }
      // res.sendStatus(200, 'logged in');
    });
  })(req, res, next);
}, userController.saveRepos);

module.exports = authRouter;