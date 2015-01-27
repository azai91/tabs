var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxMessageConstants = require('../constants/FluxMessageConstants');
var _ = require('lodash');

// Define inital data points
var _conversations = [],
    _selectedMessageIndex = 0;

function loadMessagesData(data) {
  _conversations = data;
}

function setSelected(index) {
  _selectedMessageIndex = index;
}

function addMessageToSelected(data, index) {
  _conversations[index].messages.push(data);
}

var ConversationStore = _.extend({}, EventEmitter.prototype, {
  getConversationList: function() {
    return _conversations;
  },

  // Returns the index of the message that is currently open
  getSelectedConversationIndex: function() {
    return _selectedMessageIndex;
  },

  // Emit change for views to listen to
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Listens for actions
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;
  switch(action.actionType) {
    case FluxMessageConstants.RECEIVE_MESSAGE_DATA:
      loadMessagesData(action.data);
      break;

    case FluxMessageConstants.SELECT_MESSAGE:
      setSelected(action.data);
      break;

    case FluxMessageConstants.ADD_MESSAGE:
      addMessageToSelected(action.message, action.index);
      break;

    default:
      return true;
  }

  // If action was responsed to, emit change event for views to re-render
  ConversationStore.emitChange();

  return true;

});

module.exports = ConversationStore;