var express                = require('express'),
    fs                     = require('fs'),
    logger                 = require('morgan');
    mongoose               = require('mongoose'),
    passport               = require('passport'),
    cookieParser           = require('cookie-parser'),
    bodyParser             = require('body-parser'),
    session                = require('express-session'),
    mongoURI               = require('./server/config/database'),
    userController         = require('./server/users/userController'),
    messageController      = require('./server/messages/messageController'),
    conversationController = require('./server/conversations/conversationController');

// Connect to Database
mongoose.connect(mongoURI.URI);

// Config
var app = express();
var logStream = fs.createWriteStream(__dirname + '/logfile.log', {flags: 'a'}); // create a write stream (flags: a, means it only opens to append)
app
  .use(logger('dev', {stream: logStream}))
  .use(express.static(__dirname))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session({
    secret: 'alcajo',
    resave: false,
    saveUninitialized: true
  }));

// Passport Middleware
app
  .use(passport.initialize())
  .use(passport.session());
require('./server/config/passport')(passport);

// Routers
var messagesRouter  = require('./server/routes/messagesRouter'),
    usersRouter     = require('./server/routes/usersRouter'),
    authRouter      = require('./server/routes/authRouter');

app
  .use('/users', usersRouter)
  .use('/messages', messagesRouter)
  .use('/auth', authRouter);


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server now listening on port ' + port);