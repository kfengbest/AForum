'use strict';

var React = require('react-native');
var {
  Navigator,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} = React;

var OAuth2View = require('./OAuth2View');
var ProfileView = require('./ProfileView');

var MeView = React.createClass({

  getInitialState() {
    return {
    };
  },

  renderScene(route, nav){
    switch(route.id){
      case 'login':
        return <OAuth2View navigator={nav} />;
      case 'profile':
        return <ProfileView navigator={nav} />;
      default:
        return <View />;
    }
  },

  render() {
    return (
      <Navigator
        initialRoute={{id: 'profile',}}
        renderScene={this.renderScene}
      />
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = MeView;