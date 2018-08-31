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
  SegmentedControlIOS,
  AsyncStorage,
} = React;

// Loading the refresher ListView and Indicator
var RefreshableListView = require('react-native-refreshable-listview');


var QuestionsCell = require('./QuestionsCell');
var QuestionsDetail = require('./QuestionsDetail');
var Gateway = require('./Gateway');
var Config = require('./Config');

var QuestionsList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new RefreshableListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoading: false,
      values: ['All', '24h', '7 days', 'New'],
      selectedIndex: 0,
      cachedData: [{offset: 0, items: []}, 
                   {offset: 0, items: []},
                   {offset: 0, items: []},
                   {offset: 0, items: []}],
    };
  },

  _onChange(event) {
    var index = event.nativeEvent.selectedSegmentIndex;
    this.state.selectedIndex = index;

    if (this.state.cachedData[index].items.length > 0) {
      console.log('onChange load cache');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.cachedData[index].items),
      });      
    }else{
      console.log('onChange refresh');
      this.loadData();
    }

  },

  onEndReached: function() {
    if (this.isLoading()) {
      return;
    }

    this.loadData(true);
  },

  onRefresh: function(){
    this.loadData();
  },

  componentDidMount: function() {
    this.loadData();
  },

  handleLoadedData: function(items, offset, loadMoreMode, segmentIndex){
      var that = this;
      var totalItems = items;

      if (!items || items.length === 0) {
        that.setState({
          isLoading: false,
        });
        return;
      }

      items = Array.prototype.map.call(items, (e)=>{
        var body = e.body;
        var regex = /(&nbsp;)/ig;
        e.body = body.replace(regex, "");
        return e;
      });

      if (loadMoreMode) {
        totalItems = that.state.cachedData[segmentIndex].items.concat(items);
      }

      that.state.cachedData[segmentIndex] = {
        offset: offset,
        items: totalItems
      }; 

      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(totalItems),
        isLoading: false,
      });
  },

  loadData : function(loadMoreMode){
    var that = this;    
    var boardId = this.props.board.id;
    var offset = 0;
    var segmentIndex = that.state.selectedIndex;

    this.setState({
      isLoading: true,
    });
    if(loadMoreMode){
      offset = that.state.cachedData[segmentIndex].offset + 1;
    }

    if (segmentIndex === 3) {
      Gateway.postsWithoutReplies(boardId, offset, (items)=>{
        that.handleLoadedData(items, offset, loadMoreMode, segmentIndex);
      });
    }else{
      var days = 30;
      if (segmentIndex === 0) {
        days = 30;
      }else if(segmentIndex === 1){
        days = 1;
      }else if(segmentIndex === 2){
        days = 7;
      }
      Gateway.postsInNDays(days, boardId, offset, (items)=>{
        that.handleLoadedData(items, offset, loadMoreMode, segmentIndex);
      });      
    }

  },

  async MarkAsRead(message) {
    var key = message.id;
    key = Config.READ_PREFIX + key;
    AsyncStorage.setItem(key, message.conversation.messages_count.toString());
  },

  onCellSelected : function(message : Object){

    this.MarkAsRead(message);

    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: "Message",
        component: QuestionsDetail,
        passProps: {message},
      });
    }
  },

  hasMore: function(): boolean {
    return true;
  },

  isLoading: function() : boolean{
    return this.state.isLoading;
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

  renderRow : function(question){
    return (
      <QuestionsCell 
         onSelect={() => this.onCellSelected(question)}
         question={question}
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

  
  render: function() {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>  
        <SegmentedControlIOS 
          style={styles.segmentControl} 
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
        />    
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          loadData={this.onRefresh}
          automaticallyAdjustContentInsets={false}
          scrollRenderAheadDistance={50}
        />  
      </View>  
    );
  },
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
  segmentControl: {
    marginTop:68, 
    marginBottom: 5, 
    marginLeft: 5,
    marginRight: 5,
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
});

module.exports = QuestionsList;