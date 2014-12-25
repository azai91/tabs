var request                = require('supertest'),
    express                = require('express'),
    bodyParser             = require('body-parser'),
    cookieParser           = require('cookie-parser'),
    passport               = require('passport'),
    session                = require('express-session'),
    mongoose               = require('mongoose'),
    conversationController = require('../server/conversations/conversationController'),
    User                   = require('../server/users/userModel'),
    Message = require('../server/messages/messageModel'),
    Conversation = require('../server/conversations/conversationModel'),
    userController = require('../server/users/userController');

var expect = require('chai').expect;

mongoose.connect('mongodb://localhost/tabsdb');

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

require('../server/config/passport')(passport);

app.post('/messages', conversationController.saveToConversation);

app.get('/messages', userController.isLoggedIn, conversationController.getConversations);

app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
  res.send('success signup');
});

app.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.send('success login');
});

var senderId, recipientId, agent;

describe('ConversationController Spec', function() {

  // Clears User DB
  before(function(done) {
    User.remove({}, function(err) {
      done();
    })
  });

  // Clears Conversation DB
  before(function(done) {
    Conversation.remove({}, function(err) {
      done();
    })
  });

  // Clears Message DB
  before(function(done) {
    Message.remove({}, function(err) {
      done();
    })
  });

  // Creates two users for conversation
  before(function(done) {
    User.create({email: 'sender@hotmail.com', password: '1'}, function(err, createdUser1) {
      if (err) {
        console.log(err);
      }
      senderId = createdUser1.id;

      User.create({email: 'recepient@gmail.com', password: '2'}, function(err, createdUser2) {
        if (err) {
          console.log(err);
        }
        recipientId = createdUser2.id;
        done();
      })
    });
  });

  // Logs agent in as user
  before(function(done) {
    agent = request.agent(app);
    agent
        .post('/login')
        .send({ email: 'sender@hotmail.com', password: '1'})
        .end(done);
  });


  // Posts three messages to DB
  describe('POST Messages', function() {
    it('should create a conversation if no conversation is specified', function(done) {
      agent
        .post('/messages')
        .send({senderId: senderId, recipientId: recipientId, body: 'first post'})
        .expect(200, done);
    });

    it('should add message to already existing conversation', function(done) {

      Conversation.find({}, function(err, foundMessages) {
        conversationId = foundMessages[0].id;

        agent
          .post('/messages')
          .send({recipientId: recipientId, body: 'second post', conversationId: conversationId})
          .expect(200, done);
      });
    });

    it('should add message to already existing conversation', function(done) {

      Conversation.find({}, function(err, foundMessages) {
        conversationId = foundMessages[0].id;

        agent
          .post('/messages')
          .send({recipientId: recipientId, body: 'third post', conversationId: conversationId})
          .expect(200, done);
      });
    });

  });

  // Gets conversations from DB
  describe('GET Messages', function() {
    it('should retrieve the entire conversation', function(done) {
      agent
        .get('/messages')
        .end(function(err, res) {
          // console.log('res', res);
          expect(res.body[0].messages).to.have.length.of(3);
          done();
        });
    });

    it('should retrieve the entire conversation in client format', function(done) {
      agent
        .get('/messages')
        .end(function(err, res) {
          // console.log(res.body[0].messages);
          done();
        })
    });

    xdescribe('Show Databases', function() {
      it('should show conversation DB', function(done) {
        Conversation.find({})
          .populate('users')
          .exec(function(err, foundConversations) {
            console.log('foundConversations', foundConversations);
            done();
          });
      });

      it('should show user DB', function(done) {
        User.find({})
          .populate('conversations')
          .exec(function(err, foundUsers) {
            console.log('foundUsers', foundUsers);
            done();
          });
      });

      it('should show message DB', function(done) {
        Message.find({})
          .populate('senderId')
          .exec(function(err, foundMessages) {
            console.log('foundMessages', foundMessages);
            done();
          });
      });

    });

  });

});
