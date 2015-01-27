var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var AuthAPI = require('./utils/AuthAPI');

var React = require('react');

// Components
var FluxMessageApp = require('./components/FluxMessageApp.react');
var FluxHomeApp = require('./components/FluxHomeApp.react');
var FluxLogin = require('./components/FluxLogin.react');
var Navigation = require('react-router').Navigation;

var Home = React.createClass({
  mixins: [Navigation],

  logout: function() {
    // this.transitionTo('messages');
    AuthAPI.logout.call(this);
  },

  render: function() {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="messages">Messages</Link></li>
            <li><Link to="login">Login</Link></li>
            <li onClick={this.logout}>Logout</li>
          </ul>
        </header>
        <RouteHandler/>

      </div>
    );
  }
});


var routes = (
  <Route name="app" path="/" handler={Home}>
    <Route name="messages" handler={FluxMessageApp}/>
    <Route name="login" handler={FluxLogin}/>
    <DefaultRoute handler={FluxHomeApp}/>
  </Route>
);

module.exports = routes;