'use strict';

var React = require('react-native');
var {
  Navigator,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var TemplateView = React.createClass({
    
  getInitialState: function() {
    return {
    };
  },

  render: function() {

    return (
      <View style={styles.container}>
          <Text style={styles.content}>template</Text>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content:{
    flex: 1,
    marginTop: 10,
  },
 
});

module.exports = TemplateView;