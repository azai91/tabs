var React = require('react'),
    FluxUserActions = require('../actions/FluxUserActions'),
    FluxProfileListItem = require('./FluxProfileListItem.react');

var FluxProfileList = React.createClass({
  render: function() {
    var _this = this;
    var profiles = this.props.profList.map(function(profile, index) {
      return (
        <FluxProfileListItem key={profile._id} index={index} profile={profile} />
      );
    });
    return (
      <div className="flux-profile-list">
        {profiles}
      </div>
    );
  }
});

module.exports = FluxProfileList;