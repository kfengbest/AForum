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


var profileUrl = "http://autodesk.i.lithium.com/t5/image/serverpage/image-id/157676i2FEB2498C7211AD4/image-dimensions/60x60/image-coordinates/0%2C0%2C394%2C394?v=mpbl-1";

var ProfileView = React.createClass({
    

  render: function() {


    return (
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <Image 
            style={styles.qAuthorProfile}
            source={{uri:profileUrl}}
          ></Image>
          <Text>name</Text>
          <Text>title</Text>
          <Text>32 kudo</Text>
          <Text>23 solution</Text>
        </View>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  basicInfo:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  qAuthorProfile: {
    flex: 1,
    backgroundColor: '#dddddd',
    height: 64,
    width: 64,
    marginRight: 10,
    borderRadius:30,
  },  
});

module.exports = ProfileView;