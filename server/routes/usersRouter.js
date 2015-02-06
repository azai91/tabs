var express                = require('express'),
    userController         = require('../users/userController');

var usersRouter = express.Router();

usersRouter.route('/')
  .get(userController.isLoggedIn, userController.getUsers); //returns users array to the user

// usersRouter.route('/:id')
//   .get() // get single user
//   .put() // update single user information
//   .delete(); // delete single user

usersRouter.route('/:technology')
  .get(userController.searchForTechnology); // get users who know a specified technology

module.exports = usersRouter;