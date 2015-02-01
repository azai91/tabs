var express                = require('express'),
    fs                     = require('fs'),
    morgan                 = require('morgan');
    mongoose               = require('mongoose'),
    passport               = require('passport'),
    cookieParser           = require('cookie-parser'),
    bodyParser             = require('body-parser'),
    session                = require('express-session'),
    mongoURI               = require('./server/config/database'),
    userController         = require('./server/users/userController'),
    messageController      = require('./server/messages/messageController'),
    conversationController = require('./server/conversations/conversationController');

var app = express();

mongoose.connect(mongoURI.URI);

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create a write stream (flags: a, means it only opens to append)
var logStream = fs.createWriteStream(__dirname + '/logfile.log', {flags: 'a'})

// setup the logger
app.use(morgan('dev', {stream: logStream}))

app.use(cookieParser());

app.use(session({
// does it matter what the secret is?
  secret: 'alcajo',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

var router = express.Router();

router.route('/search')
  // accepts query for a skill and returns an array of users who teach that skill
  .post(userController.searchForSkill);

router.route('/messages')
  // returns conversations array for the user
  .get(userController.isLoggedIn, conversationController.getConversations)
  // adds incoming message to database if user is logged in
  .post(userController.isLoggedIn, conversationController.saveToConversation);

router.route('/users')
  //returns users array to the user
  .get(userController.isLoggedIn, userController.getUsers);

router.route('/logout')
  // logs user out using passports .logout() functionality
  .get(userController.logout);


// handle the github authentication, define scopes to which we want access
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user', 'repo'] }));

// handle the callback after github has authenticated the user
// router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), userController.saveRepos);

router.get('/auth/github/callback', function(req, res, next) {
  console.log("req", req.body);
  passport.authenticate('github', function(err, user, info) {
    if (err) { console.log('ERROR!!!!'); return next(err); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('logged in successfully'); //redirect to homepage
      if (!user.oldUser) { next(); }
      res.sendStatus(200, 'logged in');
    });
  })(req, res, next);
}, userController.saveRepos);

app.use('/', router);


var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server now listening on port ' + port);