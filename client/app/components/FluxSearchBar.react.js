var React = require('react');
var UserAPI = require('../utils/UserAPI');

var FluxSearchBar = React.createClass({
  getInitialState: function() {
    return {
      skill: ''
    };
  },
  handleSubmit: function() {
    var skillObject = {
      skill: this.state.skill
    };

    console.log(skillObject);
    UserAPI.getSkilledUserData(skillObject);

  },
  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  render: function() {
    var skill = this.state.skill;

    return (
      <form>
        <input
          type="text"
          value={skill}
          placeholder='Search for a skill'
          onChange={this.handleChange('skill')} />
        <button type="button" onClick={this.handleSubmit}>Search</button>
      </form>
    );
  }
});

module.exports = FluxSearchBar;