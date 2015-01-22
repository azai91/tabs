var React = require('react');
var AuthAPI = require('../utils/AuthAPI');
    // FluxSignupActions = require('../actions/FluxSignupActions');
var Router = require('react-router');
var Navigation = Router.Navigation;

var FluxSignup = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      skills: '',
      interests: '',
      student: false,
      guide: false
    };
  },
  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  changeSelection: function(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.checked;
      console.log(state);
      this.setState(state);
    }.bind(this);
  },
  handleSignupSubmit: function() {

    var signupObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      skills: [this.state.skills],
      interests: this.state.interests,
      student: this.state.student,
      guide: this.state.guide
    };

    AuthAPI.handleSignupSubmit.call(this, signupObject);

  },
  render: function() {
    var firstName = this.state.firstName,
        lastName = this.state.lastName,
        email = this.state.email,
        password = this.state.password,
        skills = this.state.skills,
        interests = this.state.interests,
        student = this.state.student,
        guide = this.state.guide;

    return (
      <div>
        <form>
          <div>
            <input type="text" value={firstName} placeholder="First Name" onChange={this.handleChange("firstName")}/>
          </div>
          <div>
            <input type="text" value={lastName} placeholder="Last Name" onChange={this.handleChange("lastName")}/>
          </div>
          <div>
            <input type="text" value={email} placeholder="Email" required onChange={this.handleChange("email")}/>
          </div>
          <div>
            <input type="password" value={password} placeholder="Password" onChange={this.handleChange("password")}/>
          </div>

          <input type="checkbox" checked={student} onChange={this.changeSelection("student")} /> Student
          <input type="checkbox" checked={guide} onChange={this.changeSelection("guide")} /> Guide

          { this.state.guide ?
            <div>
            <div><input type="text" value={skills} placeholder="Skills" onChange={this.handleChange("skills")}/></div>
            <div><input type="text" value={interests} placeholder="Interests" onChange={this.handleChange("interests")}/></div>
            </div>
          : null }
          <div>
            <button type="button" onClick={this.handleSignupSubmit}>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FluxSignup;

// <div>
//   <input type="text" value={status} placeholder="Status" onChange={this.handleChange("status")}/>
// </div>