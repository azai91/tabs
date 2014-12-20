var User = require('./userModel');

var userController = {};
userController.addRemainingDetails = addRemainingDetails;
userController.isLoggedIn = isLoggedIn;
userController.logout = logout;
userController.searchForSkill = searchForSkill;

// passport local strategy, local-signup only adds email and password, 
// so here we add the rest of the details that were submitted
function addRemainingDetails(req, res) {

  var email = req.body.email,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      status = req.body.status,
      offerings = req.body.offerings,
      skills = req.body.skills,
      interests = req.body.interests;

  User.update({email: email}, {
    firstName: firstName,
    lastName: lastName,
    status: status,
    offerings: offerings,
    skills: skills,
    interests: interests
  }, function (err, numberAffected, raw) {
    if (err) throw err; // not sure what to do with the error
    console.log(raw); // curious what the raw response from mongo is
  });

  res.redirect('/');
};

// middleware that checks if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

// sends back all users in an array without password, who have that skill
function searchForSkill(req, res) {
  var skill = req.body.skill;
  User.find({ skills: { $elemMatch: skill} }, function(err, results) {
    res.end(results);
  });
};

module.exports = userController;