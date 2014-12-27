var React = require('react');
var FluxMessageActions = require('../actions/FluxMessageActions');
var FluxMessageListItem = require('./FluxMessageListItem.react');

var FluxMessageList = React.createClass({

  render: function() {
    var _this = this;
    var messages = this.props.messages.map(function(message, index) {
      return (
        <FluxMessageListItem index={index} message={message}/>
      );
    });

    return (
      <div className="flux-message-list">
        {messages}
      </div>
    );
  }
});

module.exports = FluxMessageList;