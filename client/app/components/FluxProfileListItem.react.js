var React = require('react');
var FluxUserActions = require('../actions/FluxUserActions');

var FluxProfileListItem = React.createClass({

  selectProf: function() {
    console.log('clickedProf');
    FluxUserActions.selectUser(this.props.index);
  },

  render: function() {
      var prof = this.props.profile;
      console.log(prof.skills);

    return (
      <div className="flux-profile-list-item" onClick={this.selectProf}>
        <div>{prof.firstName} {prof.lastName} </div>
        <ul>
          {
            prof.skills.map(function(skill) {
            return (
                <li key={skill}>{skill}</li>
            );
          })}
        </ul>

        <div>{prof.interests}</div>
      </div>
    );
  }
});

module.exports = FluxProfileListItem;