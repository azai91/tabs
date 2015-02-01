var React = require('react');
var AuthAPI = require('../utils/AuthAPI');
    // FluxLoginActions = require('../actions/FluxLoginActions');
var Router = require('react-router');
var Navigation = Router.Navigation;

var FluxLogin = React.createClass({
  mixins: [Navigation],

  // handleLoginSubmit: function() {
  //   // var loginObject = {
  //   //   email: this.state.email,
  //   //   password: this.state.password
  //   // };

  //   AuthAPI.handleLoginSubmit.call();

  // },

  render: function() {
    return (
      <div>
        <a href="/auth/github">Login with Github</a>
      </div>
    );
  }
});

module.exports = FluxLogin;

// <button type="button" onClick={this.handleLoginSubmit}>Login</button>