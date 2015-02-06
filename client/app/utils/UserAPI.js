var FluxUserActions = require('../actions/FluxUserActions');
var SampleUsers = require('../SampleUsers');
var $ = require('jquery');

module.exports = {
  getUserData: function() {
    $.get('/users', function(users) {
      console.log(users);
      FluxUserActions.receiveUsers(users);
    }).fail(function(err) {
      console.log('failed to retrieve users', err);
    });
  },
  getSkilledUserData: function(technology) {
    $.ajax({
      url: '/users/' + technology,
      type: 'GET',
      success: function(users) {
        FluxUserActions.receiveUsers(users);
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err, err.toString());
      }
    });
  },
};