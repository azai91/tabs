var Dispatcher = require('flux').Dispatcher;

//Create dispatcher instance (singleton)
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;