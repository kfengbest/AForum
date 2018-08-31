/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  NavigatorIOS,
  View,
  Text,
  TouchableOpacity,
} = React;


var TabsView = require('./TabsView');
var ProductList = require('./ProductList');
var OAuth2View = require('./OAuth2View');

var View3 = React.createClass({
  
  render(){
    return (
      <View>
        <Text style={styles.content}>view3</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({name:"TabsView"});
        }}>
          <Text>go to view4</Text>
        </TouchableOpacity>
      </View>
    );
  },

});

var View4 = React.createClass({
  
  render(){
    return (
      <View>
        <Text style={styles.content}>view4</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({name:"view5"});
        }}>
          <Text>go to view5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.pop();
        }}>
          <Text>pop</Text>
        </TouchableOpacity>        
      </View>
    );
  },

});

var View5 = React.createClass({
  
  render(){
    return (
      <View>
        <Text style={styles.content}>view5</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({
            component: View6
          })
        }}>
          <Text>go to view6</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.pop();
        }}>
          <Text>pop</Text>
        </TouchableOpacity>
      </View>
    );
  },

});

var View6 = React.createClass({
  
  render(){
    return (
      <View>
        <Text style={styles.content}>view6</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.replace({name:"view3"});
        }}>
          <Text>go to view3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.pop();
        }}>
          <Text>pop</Text>
        </TouchableOpacity>
      </View>
    );
  },

});



var View2 = React.createClass({

  router(route, nav){
    switch(route.name){
      case 'view3':
        return (
          <View3 navigator={nav}/>
        );
      case 'view4':
        return (
          <View4 navigator={nav}/>
        );
      case 'view5':
        return (
          <View5 navigator={nav}/>
        );        
      default:
        return (<View />);
    }
  },

  render(){
    return (
      <Navigator 
        initialRoute={{name:'view3'}}
        renderScene={this.router}
      />
    );
  },
});

var View1 = React.createClass({
  
  render(){
    return (
      <Text style={styles.content}>aaaa</Text>
    );
  },

});

var Page5 = React.createClass({

  render(){
    return (
      <View>
        <Text style={styles.content}>Page5</Text>
        <TouchableOpacity onPress={()=>{
        }}>
          <Text>go to </Text>
        </TouchableOpacity>      
      </View>
    );
  },

});



var Page4 = React.createClass({

  render(){
    return (
      <View>
        <Text style={styles.content}>Page4</Text>
        <TouchableOpacity onPress={()=>{
        }}>
          <Text>go to </Text>
        </TouchableOpacity>      
      </View>
    );
  },

});

var Page3 = React.createClass({

  onNew(){
    //this.props.navigator.pop();
    this.props.navigator.push({
      title:"page5",
      component: Page5,
      rightButtonTitle: "Done",
      onRightButtonPress: ()=> this.props.navigator.pop(),
    });
  },

  render(){
    return (
      <View>
        <Text style={styles.content}>Page3</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({
            title: 'Page4',
            component: Page4,
            backButtonTitle: 'Cancel',
            rightButtonTitle: 'New',
            onRightButtonPress: this.onNew,
          });
        }}>
          <Text>push to page4</Text>
        </TouchableOpacity>      
      </View>
    );
  },

});

var Page2 = React.createClass({

  render(){
    return (
      <View>
        <Text style={styles.content}>Page2</Text>
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({
            title: "page3",
            component: Page3,
          });
        }}>
          <Text>push to page3</Text>
        </TouchableOpacity>      
      </View>
    );
  },

});


var Page1 = React.createClass({

  render(){
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          component: Page2,
          title: 'Paaage2',
        }}

      />
    );
  },

});


var MainView = React.createClass({

  router(route, nav){
    switch(route.id){
      case 'login':
        return (
          <OAuth2View navigator={nav}/>
        );
      case 'tabsview':
        return (
          <TabsView />
        );       
      default:
        return (<View />);
    }
  },

  render(){
    return (
      <Navigator 
        initialRoute={{id:'login'}}
        renderScene={this.router}
      />
    );
  },
});

var AForum = React.createClass({


  render: function() {
    return (
      <MainView />
    );
  },

  // render: function() {
  //   return (
  //       <NavigatorIOS 
  //         style = {styles.container}
  //         initialRoute={{
  //           title: 'Products',
  //           component: ProductList,
  //         }}
  //       />
  //   );
  // },
    
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content:{
    marginTop: 100,
  },
});

AppRegistry.registerComponent('AForum', () => AForum);
