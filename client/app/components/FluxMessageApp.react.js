var React = require('react');
var FluxMessageActions = require('../actions/FluxMessageActions');
var MessageStore = require('../stores/MessageStore');
var FluxMessageList = require('./FluxMessageList.react');
var FluxMessageView = require('./FluxMessageView.react');

function getMessagesState() {
  return {
    messageList: MessageStore.getMessageList(),
    selectedMessageIndex: MessageStore.getSelectedIndex()
  };
}

var FluxMessageApp = React.createClass({

  getInitialState: function() {
    return getMessagesState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  // Render child comonents, pass state to props
  render: function() {
    var selectedMessageIndex = this.state.selectedMessageIndex;
    var currentMessage = this.state.messageList[selectedMessageIndex];
    return (
      <div className="flux-message-app">
        <FluxMessageList messages={this.state.messageList} />
        <FluxMessageView currentMessage={currentMessage} index={selectedMessageIndex} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMessagesState());
  }
});

module.exports = FluxMessageApp;