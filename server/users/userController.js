var User = require('./userModel');
var mongoose = require('mongoose');

var userController = {};
userController.addRemainingDetails = addRemainingDetails;
userController.isLoggedIn = isLoggedIn;
userController.logout = logout;
userController.searchForSkill = searchForSkill;
userController.addConversationToUsers = addConversationToUsers;

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
  res.send([]);
  // res.redirect('/');
};

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

// sends back all users in an array without password, who have that skill
function searchForSkill(req, res) {
  var skill = req.body.skill;
  UserGroup.find({ skills: { $elemMatch: skill} })
    .populate('email firstName lastName status skills interests')
    .exec(function(error, results) {
      res.send(results);
  });
};

function addConversationToUsers(req, res, next) {

  var senderId = mongoose.Types.ObjectId(req.body.senderId);
  var recipientId = mongoose.Types.ObjectId(req.body.recipientId);
  var conversationId = mongoose.Types.ObjectId(req.body.conversationId);

  User.update({ _id : { $in : [senderId, recipientId] } },
              { $push : { conversations: conversationId } },
              { multi: true },
              function(err, updatedUser) {
                if (err) {
                  console.log('error add conversation to user', err);
                }
                res.sendStatus(200);
              });
}

module.exports = userController;