var request = require('supertest'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session');

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || "thisisasecret",
  resave: false,
  saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', function (req, res) {


});