var React = require('react');
    // FluxSignupActions = require('../actions/FluxSignupActions');

var FluxGuideSignup = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Signup</h1>
        <form action="/signup" method="post">

          <div>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>


          <label for="signupbutton">
            <input value="Sign Up" type="submit" id="signupbutton" />
          </label>
        </form>
      </div>
    );
  }
});

module.exports = FluxGuideSignup;