var React = require('react');
    // FluxSignupActions = require('../actions/FluxSignupActions');

var FluxGuideSignup = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Signup</h1>
        <form action="/signup" method="post">
          <div>
            <label for="status">Status</label>
            <input type="text" name="status" id="status" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <label for="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" />
          </div>
          <div>
            <label for="skills">Skills</label>
            <input type="text" name="skills" id="skills" />
          </div>
          <div>
            <label for="interests">Interests</label>
            <textarea type="text" name="interests" id="interests" />
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