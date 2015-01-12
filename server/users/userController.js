var User = require('./userModel');
var mongoose = require('mongoose');

var userController = {};
userController.getUsers = getUsers;
userController.addRemainingDetails = addRemainingDetails;
userController.isLoggedIn = isLoggedIn;
userController.logout = logout;
userController.searchForSkill = searchForSkill;
userController.addConversationToUsers = addConversationToUsers;

// passport local strategy, local-signup only adds email and password,
// so here we add the rest of the details that were submitted
function addRemainingDetails(req, res) {
  console.log(req.body);

  var email = req.body.email,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      student = req.body.student,
      guide = req.body.guide,
      offerings = req.body.offerings,
      skills = req.body.skills,
      interests = req.body.interests;

  User.update({email: email}, {
    firstName: firstName,
    lastName: lastName,
    student: student,
    guide: guide,
    offerings: offerings,
    skills: skills,
    interests: interests
  }, function (err, numberAffected, raw) {
    if (err) throw err; // not sure what to do with the error
    console.log(raw); // curious what the raw response from mongo is
  });

  res.sendStatus(200,'created session');
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
  // res.send(200);
  res.redirect('/#/');
}

// sends back all users in an array without password, who have that skill
function searchForSkill(req, res) {
  var skill = req.body.skill;
  User.find({ skills: skill }, function(err, users){
    res.send(users);
  });
};

function getUsers(req, res) {
  console.log('getUsers');
  var userId = mongoose.Types.ObjectId(req.user._id);
  User.find({})
  .populate('users')
  .exec(function(err, foundUsers) {
    if (err) {
      console.log('cannot get users', err);
    }
    var users = foundUsers.map(function(user) {
      return user;
    });
    res.send(users);
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