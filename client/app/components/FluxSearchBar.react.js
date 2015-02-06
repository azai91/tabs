var React = require('react');
var UserAPI = require('../utils/UserAPI');

var FluxSearchBar = React.createClass({
  getInitialState: function() {
    return {
      technology: ''
    };
  },
  handleSubmit: function() {
    var technology = this.state.technology;

    UserAPI.getSkilledUserData(technology);

  },
  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  render: function() {
    var technology = this.state.technology;

    return (
      <form>
        <input
          type="text"
          value={technology}
          placeholder='Search for a technology'
          onChange={this.handleChange('technology')} />
        <button type="submit" onClick={this.handleSubmit}>Search</button>
      </form>
    );
  }
});

module.exports = FluxSearchBar;