var React = require('react');
var FluxUserActions = require('../actions/FluxUserActions');

var FluxProfileListItem = React.createClass({

  selectProf: function() {
    console.log('clickedProf');
    console.log(this.props.index);
    FluxUserActions.selectUser(this.props.index);
  },

  render: function() {
      var prof = this.props.profile;
    return (
      <div className="flux-profile-list-item" onClick={this.selectProf}>
        <div className="profile-name">{prof.firstName} {prof.lastName} </div>
        <ul>Skills:
          {
            prof.skills.map(function(skill) {
            return (
                <li key={skill}>{skill}</li>
            );
          })}
        </ul>
        <div>Interests: {prof.interests}</div>
      </div>
    );
  }
});

module.exports = FluxProfileListItem;