'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage,
} = React;

var BoardList = require('./BoardList');
var ProductList = require('./ProductList');

var ACTIVE_PRODUCT_KEY = "current_product";

var HomeView = React.createClass({

  async loadProduct(){
    return await AsyncStorage.getItem(ACTIVE_PRODUCT_KEY, );
  },

  getInitialState(){

    var currentProduct = this.loadProduct().done();
    var defaultProduct = {
      id: '1234',
      title: 'Fusion360',
    };
    currentProduct = currentProduct || defaultProduct;

    return {
      product: currentProduct,
    };
  },

  async onProductChanged(product){
    console.log(product);

//    await AsyncStorage.setItem(ACTIVE_PRODUCT_KEY, JSON.stringify(product));

    this.setState({
      product: product,
    });

    this.refs.nav.pop();
  },

  onProductPressed(){
    this.refs.nav.push({
      title:'products',
      component: ProductList,
      passProps: {onProductChanged: this.onProductChanged},
    });
  },

  render: function() {

    console.log('homeview render', this.state.product);

    return (
        <NavigatorIOS 
          ref='nav'
          style = {styles.container}
          initialRoute={{
            title: this.state.product.title,
            component: BoardList,
            // leftButtonTitle: 'Products',
            // onLeftButtonPress: this.onProductPressed,
            passProps: {productId: this.state.product.id}
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

module.exports = HomeView;