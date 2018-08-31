'use strict';
var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

// Loading the refresher ListView and Indicator
var {
  RefresherListView,
  LoadingBarIndicator
} = require('react-native-refresher');


var Gateway = require('./Gateway');
var BoardList = require('./BoardList');

var ProductCell = React.createClass({
	render: function(){
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

		return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.textContainer}>
            <Text style={styles.qTitle} numberOfLines={2}>{this.props.product.title}</Text>
          </View>
        </TouchableElement>
      </View>
		);
	},
});

var ProductList = React.createClass({

 	getInitialState: function() {
  	return {
    	dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    	isLoading: false,
    	offset: 0,
  	};
  },

  componentDidMount: function() {
    Gateway.allProducts(this.state.offset, (data)=>{
        var items = [];
        if (data && data.items) {
          items = data.items;
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          isLoading: false,
        });
    });
  },  

  hasMore: function(): boolean {
    return true;
  },

  isLoading: function() : boolean{
    return this.state.isLoading;
  }, 
   
  onCellSelected : function(product : Object){
    this.props.onProductChanged(product);
  },   

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={"SEP_" + sectionID + "_" + rowID}  style={style}/>
    );
  },

  renderRow : function(product){
    return (
      <ProductCell 
         onSelect={() => this.onCellSelected(product)}
         product={product}
      />
    );
  },

  renderFooter: function() {
    if (!this.hasMore() || !this.isLoading()) {
      return <View style={styles.scrollSpinner} />;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    } else {
      return (
        <View  style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
    }
  },

  onEndReached: function() {
    if (this.isLoading()) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    console.log('onEndReach');
    var newOff = this.state.offset + 1;
    var that = this;
    Gateway.allProducts(newOff, (data)=>{
      if (data && data.items && data.items.length > 0) {

        var existData = that.state.dataSource._dataBlob.s1.slice();
        var newData = existData.concat(data.items);
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(newData),
          isLoading: false,
          offset: that.state.offset + 1,
        });
      }

    });

  },

  onRefresh: function(){
  	this.setState({
  		offset: 0,
  		isLoading: true,
  	});

  	Gateway.allProducts(this.state.offset, (data)=>{
        var items = [];
        if (data && data.items) {
          items = data.items;
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          isLoading: false,
        });
    });
  },

	render: function() {
		return (
	        <RefresherListView
	          dataSource={this.state.dataSource}
	          renderRow={this.renderRow}
	          onRefresh={this.onRefresh}
	          indicator={<LoadingBarIndicator />}
	          renderSeparator={this.renderSeparator}
	          renderFooter={this.renderFooter}
	          onEndReached={this.onEndReached}
	        />  			
		);
	}
});


var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },

  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 8,
  },
  qTitle:{
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },    
});

module.exports = ProductList;