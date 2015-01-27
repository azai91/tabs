var React = require('react');

var FluxMessage = React.createClass({

  render: function() {
    return (
      <li className={this.props.className} >{this.props.message}</li>
    );
  }
});

module.exports = FluxMessage;
