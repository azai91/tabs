var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxMessageConstants = require('../constants/FluxMessageConstants');
var FluxMessageActions = {

  // Receive messages from API
  receiveMessages: function(data) {
    AppDispatcher.handleAction({
      actionType: FluxMessageConstants.RECEIVE_MESSAGE_DATA,
      data: data
    });
  },

  selectMessage: function(index) {
    AppDispatcher.handleAction({
      actionType: FluxMessageConstants.SELECT_MESSAGE,
      data: index
    });
  },

  // Will POST message to server and re-render view if POST successful
  sendMessage: function(message, index) {
    AppDispatcher.handleAction({
      actionType: FluxMessageConstants.ADD_MESSAGE,
      message: message,
      index: index
    });
  }
};

module.exports = FluxMessageActions;