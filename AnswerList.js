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

var AnswerCell = require('./AnswerCell');
var Gateway = require('./Gateway');
var RefreshableListView = require('react-native-refreshable-listview');
var Subscribable = require('Subscribable');


var NoComments = React.createClass({
  render: function() {
    return (
      <View style={styles.noComments}>
        <Text style={styles.noMoviesText}>{"No Comments yet."}</Text>
      </View>
    );
  }
});


var AnswerList = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState() {
    return {
      dataSource: new RefreshableListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      cache: {offset: 0, items:[]}, 
    };
  },

  reloadData() {
    var offset = 0;
    var that = this;
    return Gateway.allComments(this.props.boardid, this.props.messageid, offset, (items)=>{
      return that.updateDataSourceHandler(items, offset);
    });
  },

  appendData() {
    var offset = this.state.cache.offset + 1;
    var that = this;

    return Gateway.allComments(this.props.boardid, this.props.messageid, offset, (items)=>{
      that.state.cache.items.push(...items);
      return that.updateDataSourceHandler(that.state.cache.items, offset);
    });    
  },

  componentDidMount() {
    this.addListenerOn(this.props.events, 'newCommentEvent', this.onHandleNewComment);
    this.reloadData();
  },

  onHandleNewComment(comment){

    this.reloadData();

    // console.log(comment);
    // var offset = this.state.cache.offset;
    // var items = this.state.cache.items;

    // var commentObj = {
    //   author: {
    //     href: comment.author.href,
    //     login: comment.author.login.$,
    //   },
    //   board: {
    //     href: comment.board.href,
    //     id: comment.board_id.$,
    //     type: 'board'
    //   },
    //   body: comment.body.$,
    //   id: comment.id.$,
    //   post_time: comment.post_time.$,
    //   subject: comment.subject.$,
    //   metrics:{
    //     views: 0
    //   }
    // }
    // items.splice(0,0,commentObj);

    // this.updateDataSourceHandler(items, offset);
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
        scrollRenderAheadDistance={50}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={false}
        renderFooter={this.renderFooter}                      
      />
    );
  },  

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          loading replies...
        </Text>
      </View>
    );
  },    

  renderFooter: function() {
    if (this.state.dataSource.getRowCount() === 0) {
      return <Text>No Comments yet...</Text>
    }
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

  renderCell(data) {
    return (
     <AnswerCell 
        message={data}
     />
    );
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
  noComments: {
    flex: 1,
    padding: 8
  },

});

module.exports = AnswerList;