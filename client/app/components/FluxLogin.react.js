var React = require('react');
var AuthAPI = require('../utils/AuthAPI');
    // FluxLoginActions = require('../actions/FluxLoginActions');
var Router = require('react-router');
var Navigation = Router.Navigation;

var FluxLogin = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      value: 'Hello!',
      email: '',
      password: '',
    };
  },
  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      console.log(state);
      this.setState(state);
    }.bind(this);
  },
  handleLoginSubmit: function() {
    var loginObject = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(loginObject);
    AuthAPI.handleLoginSubmit.call(this, loginObject);

  },
  render: function() {
    var email = this.state.email,
        password = this.state.password;

    return (
      <div>
        <a href="/auth/github">Login with Github</a>
        <form>
          <div>
            <input type="text" value={email} placeholder="Email" required onChange={this.handleChange("email")}/>
          </div>
          <div>
            <input type="password" value={password} placeholder="Password" onChange={this.handleChange("password")}/>
          </div>
          <button type="button" onClick={this.handleLoginSubmit}>Login</button>
        </form>
      </div>
    );
  }
});

module.exports = FluxLogin;