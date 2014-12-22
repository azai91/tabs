var FluxMessageActions = require('../actions/FluxMessageActions');
var SampleMessages = require('../SampleMessages');

module.exports = {
  getMessageData: function() {
    FluxMessageActions.receiveMessages(SampleMessages);
  }
};