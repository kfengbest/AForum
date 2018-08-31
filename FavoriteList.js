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
  AsyncStorage,
} = React;

// Loading the refresher ListView and Indicator
var RefreshableListView = require('react-native-refreshable-listview');
var QuestionsCell = require('./QuestionsCell');
var QuestionsDetail = require('./QuestionsDetail');
var Gateway = require('./Gateway');
var Config = require('./Config');
var reactNativeStore = require('react-native-store');
var Dimensions = require('Dimensions');
var DEVICE_HEIGTH = Dimensions.get('window').height;

var _limit = 1000;

var FavoriteList = React.createClass({

  getInitialState() {
    return {
      dataSource: new RefreshableListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      cache: {offset: 0, items:[]}, 
    };
  },

  reloadData() {
    var _offset = 0;

    var that = this;
    return reactNativeStore.model(Config.TB_FAVORITES).then(function(db){
      return db.find(null, {limit: _limit}).then((data)=>{
        return that.updateDataSourceHandler(data, _offset);
      });
    });
  },

  appendData() {

    var offset = this.state.cache.offset + 1;
    var that = this;   

    return reactNativeStore.model(Config.TB_FAVORITES).then(function(db){
      return db.find(null, {offset: _offset*_limit, limit: _limit}).then((data)=>{
        console.log('fav append data');
        that.state.cache.items.push(...data);
        return that.updateDataSourceHandler(data, _offset);
      });
    });    
  },

  componentDidMount() {
    this.reloadData();
  },

  updateDataSourceHandler(items, offset) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      loaded: true,
      cache: {
        offset: offset,
        items : items,
      },
    });
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <RefreshableListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderCell}
        loadData={this.reloadData}
        onEndReached={this.appendData}
        onEndReachedThreshold={DEVICE_HEIGTH/3}
        renderSeparator={this.renderSeparator}  
        renderFooter={this.renderFooter}              
      />
    );
  },  

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          loading messages...
        </Text>
      </View>
    );
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

  renderCell(question) {
    return (
      <QuestionsCell 
        onSelect={() => this.onCellSelected(question)}
        question={question}
      />
    );
  },

  renderFooter: function() {
    if (this.state.dataSource.getRowCount() === 0) {
      return <Text>No Favorited Messages yet...</Text>
    }
  },

  onCellSelected : function(message : Object){

    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: "Message",
        component: QuestionsDetail,
        passProps: {message},
      });
    }
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },  
});


module.exports = FavoriteList;