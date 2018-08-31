'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
} = React;

var FavoriteList = require('./FavoriteList');

var FavoriteView = React.createClass({

  render: function() {
    return (
        <NavigatorIOS 
          style = {styles.container}
          initialRoute={{
            title: 'Message',
            component: FavoriteList,
          }}
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

module.exports = FavoriteView;