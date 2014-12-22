var React = require('react');
var FluxMessageActions = require('../actions/FluxMessageActions');

var FluxMessageListItem = React.createClass({

  selectMessage: function() {
    console.log('clicked');
    FluxMessageActions.selectMessage(this.props.index);
  },

  render: function() {

    return (
      <div className="flux-message-list-item" onClick={this.selectMessage}>
      {this.props.message.from}
      </div>
    )
  }
});

module.exports = FluxMessageListItem;