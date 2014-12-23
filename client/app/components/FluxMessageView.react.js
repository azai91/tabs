var React = require('react'),
    FluxMessageActions = require('../actions/FluxMessageActions');

var FluxMessage = React.createClass({

  sendMessage: function(e) {
    e.preventDefault();
    var message = this.refs.message.getDOMNode().value.trim();

    var data = {
      message: message,
      status: 'sent'
    };

    FluxMessageActions.sendMessage(data, this.props.index);
    this.refs.message.getDOMNode().value = "";
  },

  render: function() {

    var currentMessage = this.props.currentMessage.conversation;
    var conversation = currentMessage.map(function(data, index) {

      return (
        <li className={data.status} >{data.message}</li>
      )
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
    )
  }
});

module.exports = FluxMessage;