
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  WebView,
} = React;

var HTMLWebView = require('react-native-html-webview');
var Dimensions = require('Dimensions');
var DEVICE_WIDTH = Dimensions.get('window').width - 10;

var AnswerCell = React.createClass({
  render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    var profileUrl = "http://autodesk.i.lithium.com/t5/image/serverpage/image-id/157676i2FEB2498C7211AD4/image-dimensions/60x60/image-coordinates/0%2C0%2C394%2C394?v=mpbl-1";

    return (
          <View style={styles.textContainer}>
            <View style={styles.qAuthor}>
              <Image 
                source={{uri:profileUrl}}
                style={styles.qAuthorProfile}
              />
              <Text style={styles.qAuthorName}>{this.props.message.author.login}</Text>
              <Text style={styles.qAuthorName}></Text>
              <Text style={styles.qAuthorName}>{' '}&bull;{' '}{this.props.message.post_time_friendly}{' '}&bull;{' '}</Text>
              <Text style={styles.qAuthorName}>{this.props.message.metrics.views} views</Text>
            </View>
            <View style={styles.htmlText}>
              <HTMLWebView 
                html={this.props.message.body} 
                style={styles.webView}
                autoHeight={true}
              />              
            </View>
          </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 8,
  },
  qAuthor:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  qAuthorName:{
    flex: 1,
    margin: 2,
    fontSize: 10,
  },
  qAuthorProfile: {
    flex: 1,
    backgroundColor: '#dddddd',
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius:15,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  htmlText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    margin: 10,
  },
  webView: {
    width: DEVICE_WIDTH,
  },
  img: {
    position: 'absolute',
    height: 200,
    width: DEVICE_WIDTH,
    backgroundColor: '#ccc'
  },  
});

module.exports = AnswerCell;
