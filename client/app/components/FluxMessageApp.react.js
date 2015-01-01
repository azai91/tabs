var React = require('react');
var FluxMessageActions = require('../actions/FluxMessageActions');
var MessageStore = require('../stores/MessageStore');
var FluxMessageList = require('./FluxMessageList.react');
var FluxMessageView = require('./FluxMessageView.react');
var MessageAPI = require('../utils/MessageAPI');

function getMessagesState() {

  return {
    conversationList: MessageStore.getConversationList(),
    selectedConversationIndex: MessageStore.getSelectedConversationIndex()
  };
}

// move later, GET request is async
MessageAPI.getMessageData();

var FluxMessageApp = React.createClass({

  getInitialState: function() {
    console.log('hi');
    return getMessagesState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    console.log('unmount');
    MessageStore.removeChangeListener(this._onChange);
  },

  sendMessage: function(message, index) {
    MessageAPI.sendMessage(message, index);
  },

  // Render child comonents, pass state to props
  render: function() {

    var selectedConversationIndex = this.state.selectedConversationIndex;
    var currentConversation = this.state.conversationList[selectedConversationIndex];

    return (
      <div className="flux-message-app">
        <FluxMessageList messages={this.state.conversationList} />
        <FluxMessageView currentConversation={currentConversation} index={selectedConversationIndex} sendMessage={this.sendMessage} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMessagesState());
  }
});

module.exports = FluxMessageApp;