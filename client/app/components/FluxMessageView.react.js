var React = require('react');
var FluxMessage = require('./FluxMessage.react');

var FluxMessageView = React.createClass({

  sendMessage: function(e) {
    e.preventDefault();
    var body = this.refs.message.getDOMNode().value.trim();

    var data = {
      body: body,
      status: 'sent',
      recipientId: this.props.currentConversation.withId,
      conversationId: this.props.currentConversation.conversationId
    };

    this.props.sendMessage(data, this.props.index);
    this.refs.message.getDOMNode().value = "";
  },

  render: function() {
    var currentMessage = this.props.currentConversation ? this.props.currentConversation.messages : [];
    var conversation = currentMessage.map(function(data, index) {
      return (
        <FluxMessage className={data.status} key={data.messageId} message={data.body}/>
      );
    });

    return (
      <div className="flux-message-view">
        <ul>
        {conversation}
        </ul>
        <form className="flux-message-input" onSubmit={this.sendMessage}>
          <input type="text" ref="message" />
          <input type="submit" value="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = FluxMessageView;