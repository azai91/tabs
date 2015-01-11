var express                = require('express'),
    path                   = require('path'),
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

app.use(express.static(path.join(__dirname)));

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

// accepts query for a skill and returns an array of users who teach that skill
app.post('/search', userController.searchForSkill);

// returns conversations array for the user
app.get('/messages', userController.isLoggedIn, conversationController.getConversations);


// adds incoming message to database if user is logged in
app.post('/messages', userController.isLoggedIn, conversationController.saveToConversation);


// signs up new user and adds all details
app.post('/signup', passport.authenticate('local-signup'), userController.addRemainingDetails);
// app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
//   res.send('signup successful');
// });

//returns users array to the user
app.get('/users', userController.isLoggedIn, userController.getUsers);

// uses passport local-login strategy to authenticate on login
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.sendStatus(200,'created session');
  // res.send('login successful');
});

// logs user out using passports .logout() functionality
app.get('/logout', userController.logout);

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server now listening on port ' + port);