'use strict';

var React = require('react-native');
var {
  Navigator,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} = React;

var CreateCommentView = React.createClass({
    
  getInitialState: function() {
    return {
    };
  },

  render: function() {

    return (
      <View style={styles.container}>
          <TextInput 
            style={styles.content}
            autoFocus={true}
            multiline={true}
            onChangeText={(text)=>{this.props.onTextChanged(text)}}
          >
          </TextInput>
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
    marginTop: 67,
    marginLeft: 3,
    marginRight: 3,
    borderColor: 'gray',
    borderWidth: 1,

  },
 
});

module.exports = CreateCommentView;