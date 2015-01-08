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
  }
};