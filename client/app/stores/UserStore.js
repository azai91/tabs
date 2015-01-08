var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxUserConstants = require('../constants/FluxUserConstants');
var _ = require('lodash');

//initial data
var _users = [],
    _selectedUserIndex = 0;

function loadUsersData(data) {
  console.log('in loadUsersData',data);
  _users = data;
};

function setSelected(index) {
  _selectedUserIndex = index;
};

var UserStore = _.extend({}, EventEmitter.prototype, {
  getUserList: function() {
    return _users;
  },
  getSelectedIndex: function() {
    return _selectedUserIndex;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  }
});

// Listens for actions
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;
  switch(action.actionType) {
    case FluxUserConstants.RECEIVE_USER_DATA:
      loadUsersData(action.data);
      break;

    case FluxUserConstants.SELECT_USER:
      setSelected(action.data);
      break;

    default:
      return true;
  }
  // If action was responsed to, emit change event for views to re-render
  UserStore.emitChange();
  return true;
});


module.exports = UserStore;