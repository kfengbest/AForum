'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  WebView,
  ActivityIndicatorIOS,
} = React;

var url = require('url');
var Gateway = require('./Gateway');
var Dimensions = require('Dimensions');
var DEVICE_WIDTH = Dimensions.get('window').width;
var DEVICE_HEIGHT = Dimensions.get('window').height;

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://forums.autodesk.com/auth/oauth2/authorize?client_id=mq%2FVPxnm%2BRpNN0Q%2BlCxLfiz%2Fy2pMYnpM6hEXKkVZMRw%3D&response_type=code&redirect_uri=https://forums.autodesk.com';

var OAuth2View = React.createClass({

  getInitialState: function() {
    return {
      animating: true,
    };
  },

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={this.state.animating}
          style={styles.centering}
          size="large"
        /> 
      </View>
    );
  },   

  onNavigationStateChange: function(navState) {
    console.log(navState);
    var urlObj = url.parse(navState.url, true);
    var code = urlObj.query.code;

    var that = this;

    this.setState({
      animating: navState.loading,
      authorizing: false,
    });

    if (code) {
      this.setState({
        authorizing: true,
      });

      Gateway.accessToken(code)
        .then(()=>{
          this.setState({
            animating: false,
          });
          that.props.navigator.replace({id:'tabsview'});
        })
        .catch((err) => {
          this.setState({
            animating: false,
            authorizing: false,
          });          
        })
        .done();
    };

  },

  render: function() {
    if (this.state.authorizing) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <WebView 
          ref={WEBVIEW_REF}
          url={DEFAULT_URL}
          style={styles.webView}
          onNavigationStateChange={this.onNavigationStateChange}
        >
        </WebView>
        <ActivityIndicatorIOS
          animating={this.state.animating}
          style={styles.centering}
          size="large"
        />        
      </View>
    );
  },


});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: DEVICE_HEIGHT / 2 - 40,
    left: DEVICE_WIDTH / 2 - 40,
    height: 80, 
    width: 80,   
  },
  webView: {
    height: 350,
  },  
});

module.exports = OAuth2View;