var React = require('react');
var FluxMessageActions = require('../actions/FluxMessageActions');
var ConversationStore = require('../stores/ConversationStore');
var FluxMessageList = require('./FluxMessageList.react');
var FluxMessageView = require('./FluxMessageView.react');
var MessageAPI = require('../utils/MessageAPI');

function getMessagesState() {

  return {
    conversationList: ConversationStore.getConversationList(),
    selectedConversationIndex: ConversationStore.getSelectedConversationIndex()
  };
}

var FluxMessageApp = React.createClass({

  getInitialState: function() {
    return getMessagesState();
  },

  componentWillMount: function() {
    MessageAPI.getMessageData();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
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
        <FluxMessageView currentConversation={currentConversation} sendMessage={this.sendMessage} index={selectedConversationIndex}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMessagesState());
  }
});

module.exports = FluxMessageApp;