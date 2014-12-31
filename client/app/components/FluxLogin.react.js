var React = require('react');
    // FluxLoginActions = require('../actions/FluxLoginActions');

var FluxLogin = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Login</h1>
        <form action="/login" method="post">
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <label for="loginbutton">
            <input value="Log In" type="submit" id="loginbutton" />
          </label>
        </form>
      </div>
    );
  }
});

module.exports = FluxLogin;