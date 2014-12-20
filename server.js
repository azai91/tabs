var express       = require('express'),
    path          = require('path'),
    fs            = require('fs'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    mongoURI      = require('./server/config/database'),
    userController = require('./server/users/userController'),
    messageController = require('./server/messages/messageController'),
    conversationController = require('./server/conversations/conversationController');

var app = express();

mongoose.connect(mongoURI.URI);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongodb connection open');
// });

app.use(express.static(path.join(__dirname, "../client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create a write stream (flags: a, means it only opens to append)
var logStream = fs.createWriteStream(__dirname + '/logfile.log', {flags: 'a'})

// setup the logger
app.use(morgan('dev', {stream: logStream}))

app.use(cookieParser());
app.use(bodyParser());

app.use(session({
// does it matter what the secret is?
  secret: 'alcajo',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// accepts query for a skill and returns an array of users who teach that skill
app.post('/search', userController.searchForSkill);

// returns conversations array for the user
app.get('/messages', userController.isLoggedIn, conversationController.getConversations);

// adds incoming message to database if user is logged in
app.post('/messages', userController.isLoggedIn, messageController.saveMessage, conversationController.addMessage});

// signs up new user and adds all details
app.post('/signup', passport.authenticate('local-signup'), userController.addRemainingDetails);

// uses passport local-login strategy to authenticate on login
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// logs user out using passports .logout() functionality
app.get('/logout', userController.logout);

var port = 8000;

app.listen(port);

console.log('Server now listening on port ' + port);