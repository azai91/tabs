var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxUserConstants = require('../constants/FluxUserConstants');

var FluxUserActions = {

  // Receive users from API
  receiveUsers: function(data) {
    AppDispatcher.handleAction({
      actionType: FluxUserConstants.RECEIVE_USER_DATA,
      data: data
    });
  },
  selectUser: function(index) {
    console.log('in here');
    AppDispatcher.handleAction({
      actionType: FluxUserConstants.SELECT_USER,
      data: index
    });
  }
};

module.exports = FluxUserActions;