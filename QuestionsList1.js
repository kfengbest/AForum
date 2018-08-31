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
} = React;

var Subscribable = require('Subscribable');
var RefreshableListView = require('react-native-refreshable-listview');
var QuestionsCell = require('./QuestionsCell');
var QuestionsDetail = require('./QuestionsDetail');
var Gateway = require('./Gateway');
var Config = require('./Config');
var Dimensions = require('Dimensions');
var DEVICE_HEIGTH = Dimensions.get('window').height;

var QuestionsList1 = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState() {
    return {
      dataSource: new RefreshableListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      noMore: false,
      cache: {offset: 0, items:[]}, 
      filterIndex : 0,
      filterTitle : 'Most recents'
    };
  },

  reloadData() {
    this.state.noMore = false;

    switch(this.state.filterIndex) {
      case 0:  // most recents
        return this.reloadNDays(360);
        break;
      case 1:   // last 24h
        return this.reloadNDays(1);
        break;
      case 2:  // no replies
        return this.reloadNoReplies();
        break;
      case 3: // top viewed
        return this.reloadMostViewedInNDays();
        break;
      case 4:
        return this.reloadTopRepliesInNDays();
        break;
      default:
        return this.reloadNDays(30);
        break;
    }

  },

  appendData() {
    console.log("listview appendData");
    switch(this.state.filterIndex) {
      case 0: // most recents
        return this.appendNDays(360);
        break;
      case 1: // last 24h
        return this.appendNDays(1);
        break;
      case 2: // no reply
        return this.reloadNoReplies(true);
        break;
      case 3:
        return this.reloadMostViewedInNDays(true);
        break;      
      case 4:
        return this.reloadTopRepliesInNDays(true);
        break;
      default:
        return this.appendNDays(30);
        break;
    }   
  },


  reloadNoReplies(append){
    var offset = 0;
    if (append) {
      offset = this.state.cache.offset + 1;
    };
    var boardId = this.props.board.id;
    var that = this;
    return Gateway.postsWithoutReplies(boardId, offset, (items) => {
      if (append) {
        if (items.length === 0) {
          that.state.noMore = true;
        }        
        that.state.cache.items.push(...items);
        items = that.state.cache.items;
      };
      return this.updateDataSourceHandler(items, offset);
    });    
  },

  reloadMostViewedInNDays(append){

    var offset = 0;
    if (append) {
      offset = this.state.cache.offset + 1;
    };
    var boardId = this.props.board.id;
    var that = this;
    return Gateway.mostViewedInNDays(7, boardId, offset, (items) => {
      if (append) {
        if (items.length === 0) {
          that.state.noMore = true;
        }        
        that.state.cache.items.push(...items);
        items = that.state.cache.items;
      };
      return this.updateDataSourceHandler(items, offset);
    }); 
  },

  reloadTopRepliesInNDays(append){

    var offset = 0;
    if (append) {
      offset = this.state.cache.offset + 1;
    };
    var boardId = this.props.board.id;
    var that = this;
    return Gateway.topRepliesInNDays(7, boardId, offset, (items) => {
      if (append) {
        if (items.length === 0) {
          that.state.noMore = true;
        }
        that.state.cache.items.push(...items);
        items = that.state.cache.items;
      };
      return this.updateDataSourceHandler(items, offset);
    }); 
  },

  reloadNDays(days){
    var offset = 0;
    var boardId = this.props.board.id;
    return Gateway.postsInNDays(days, boardId, offset, (items) => {
      return this.updateDataSourceHandler(items, offset);
    });
  },

  appendNDays(days){
    var offset = this.state.cache.offset + 1;
    var boardId = this.props.board.id;
    var that = this;

    return Gateway.postsInNDays(days, boardId, offset, (items) => {
      if (items.length === 0) {
        that.state.noMore = true;
      }
      that.state.cache.items.push(...items);
      return that.updateDataSourceHandler(that.state.cache.items, offset);
    }); 
  },


  componentDidMount() {
    this.addListenerOn(this.props.events, 'filterEvent', this.onHandlerFilter);
    this.reloadData();
  },

  onHandlerFilter: function(args){
    if (args.title === "Cancel") {
      return;
    }

    this.state.filterIndex = args.index;
    this.setState({
      loaded: false,
      filterTitle: args.title,
    });

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
        renderSectionHeader={this.renderSectionHeader}       
      />
    );
  },  

  renderFooter: function() {
    if (this.state.noMore) {
      return <View style={styles.scrollSpinner} ><Text>No more...</Text></View>;
    }
    if (Platform.OS === 'ios') {
      return <View style={styles.scrollSpinner}><ActivityIndicatorIOS /></View>;
    } else {
      return (
        <View  style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
    }
  },  

  renderSectionHeader: function(sectionData: string, sectionID: string) {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{this.state.filterTitle}</Text>
      </View>
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
  listHeader:{
    padding: 3,
    backgroundColor: '#82B6FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderText:{
    color: 'white',
    fontWeight: 'bold'
  },
  scrollSpinner: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

module.exports = QuestionsList1;