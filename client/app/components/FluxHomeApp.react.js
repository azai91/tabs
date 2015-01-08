var React = require('react');
var FluxUserActions = require('../actions/FluxUserActions');
var UserStore = require('../stores/UserStore');
var FluxProfileList = require('./FluxProfileList.react');
var UserAPI = require('../utils/UserAPI');

//need to implement in UserStore
function getProfilesState() {
  return {
    profList: UserStore.getUserList(),
    selectedProfIndex: UserStore.getSelectedIndex()
  };
}

var FluxHomeApp = React.createClass({
  getInitialState: function() {
    return getProfilesState();
  },
  componentWillMount: function() {
    UserAPI.getUserData();
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);    
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var selectedProfIndex = this.state.selectedProfIndex;
    var currentProfile = this.state.profList[selectedProfIndex];
    return (
      <div className="all-profiles">
         <FluxProfileList profList={this.state.profList}/>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getProfilesState());
  }
});


module.exports = FluxHomeApp;