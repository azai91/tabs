var FluxUserActions = require('../actions/FluxUserActions');
var SampleUsers = require('../SampleUsers');

module.exports = {
  getUserData: function() {
    FluxUserActions.receiveUsers(SampleUsers);
  }
};