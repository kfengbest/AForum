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
  TouchableNativeFeedback,
  ActionSheetIOS,
  Modal,
} = React;

var Gateway = require('./Gateway');
var CreateMessage = require('./CreateMessage');
var QuestionsList1 = require('./QuestionsList1');
var EventEmitter = require('EventEmitter');
var RefreshableListView = require('react-native-refreshable-listview');
var Dimensions = require('Dimensions');
var DEVICE_HEIGTH = Dimensions.get('window').height;

var BUTTONS = [
  'Most recents',
  'Last 24 hours',
  'Un-answered',
  'Most Viewed in 7 days',
  'Top Replied in 7 days',  
  'Cancel',
];

var CANCEL_INDEX = 5;

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var BoardCell = React.createClass({
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
            <Text style={styles.qDescription} numberOfLines={8}>{this.props.product.description}</Text>
          </View>
        </TouchableElement>
      </View>
		);
	},
});

var BoardList = React.createClass({

 	getInitialState: function() {
  	return {
      dataSource: new RefreshableListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      cache: {offset: 0, items:[]}, 
      newMessage : '',
      modalVisible: false,
  	};
  },

  reloadData() {
    var _offset = 0;
    var that = this;

    var productId = this.props.productId;
    return Gateway.allBoards(productId, _offset, (data)=>{
        var items = [];
        if (data && data.items) {
          items = data.items;
        }
        
        // items.push({
        //   id: 243,
        //   title: 'Design Differently',
        //   description: 'Design trends, useful tips and turorials, behind-the-scene news, and community stories',
        // });

        items.push({
          id: 5,
          title: 'Floating Test Board',
          description: 'this is a testing board.'
        });

        return that.updateDataSourceHandler(items, _offset);
    });
  },

  appendData() {
    var _offset = this.state.cache.offset + 1;
    var that = this;   
  
    // var productId = this.props.productId;
    // return Gateway.allBoards(productId, _offset, (data)=>{
    //     var items = [];
    //     if (data && data.items) {
    //       items = data.items;
    //     }

    //     if (items.length === 0) {
    //       that.state.noMore = true;
    //     }
        
    //     that.state.cache.items.push(...items);
    //     return that.updateDataSourceHandler(that.state.cache.items, _offset);
    // });

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


  componentDidMount: function() {

    this.eventEmitter = new EventEmitter();

    this.reloadData();
  },  


  onCommentChanged(text){
    console.log('Board: ', text);
    this.setState({
      newMessage: text,
    });
  },

  onAskPressed(){
    this.props.navigator.push({
      title: 'New Message',
      component: CreateMessage,
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: ()=>{
        this.props.navigator.pop();
      },
      rightButtonTitle: 'Send',
      onRightButtonPress: ()=>{
        console.log("TODO: call rest api to create new message, content is: ", this.state.newMessage);

        this.props.navigator.pop();              
      },
      passProps: {onTextChanged:this.onCommentChanged},

    });
  },

  onFilterPressed(){

    var that = this;

    this.setState({
      modalVisible: true,
    });
    // ActionSheetIOS.showActionSheetWithOptions({
    //   options: BUTTONS,
    //   cancelButtonIndex: CANCEL_INDEX,
    // },
    // (buttonIndex) => {
    //   if (buttonIndex !== CANCEL_INDEX) {
    //     that.eventEmitter.emit('filterEvent', { index: buttonIndex, title: BUTTONS[buttonIndex] });
    //   }
    // });

  },

  onButtonPressed(visible, args) {
    this.setState({modalVisible: visible});
    this.eventEmitter.emit('filterEvent', args);

  },

  renderLoadingView() {
    return (
      <View style={styles.EmptyContainer}>
        <Text>
          loading...
        </Text>
      </View>
    );
  },   

  onCellSelected : function(board : Object){
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: board.title,
        component: QuestionsList1,
        passProps: {board:board, events: this.eventEmitter},
        rightButtonTitle: 'Filter',
        onRightButtonPress: this.onFilterPressed,
      });
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

  renderRow : function(product){
    return (
      <BoardCell 
         onSelect={() => this.onCellSelected(product)}
         product={product}
      />
    );
  },

  renderFooter: function() {
    if (this.state.dataSource.getRowCount() === 0) {
      return <Text></Text>
    }
  },

  onRefresh: function(){
    this.setState({
      offset: 0,
      isLoading: true,
    });

    var productId = this.props.productId;
    console.log('Boardlist.onRefresh ', productId);
    Gateway.allBoards(productId, this.state.offset, (data)=>{
        var items = [];
        if (data && data.items) {
          items = data.items;
        }
        
        items.push({
          id: 5,
          title: 'Floating Test Board'
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          isLoading: false,
        });
    });
  },

	render: function() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }

    var modalBackgroundStyle = {
      backgroundColor: true ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = true
      ? {backgroundColor: '#F5FCFF', padding: 30}
      : null;

		return (
        <View style={styles.container}>
          <Modal
            animated={true}
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={[styles.modalContainer, modalBackgroundStyle]}>
              <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 0, title: BUTTONS[0]})}
                  style={styles.modalButton}>
                  {BUTTONS[0]}
                </Button>
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 1, title: BUTTONS[1]})}
                  style={styles.modalButton}>
                  {BUTTONS[1]}
                </Button> 
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 2, title: BUTTONS[2]})}
                  style={styles.modalButton}>
                  {BUTTONS[2]}
                </Button> 
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 3, title: BUTTONS[3]})}
                  style={styles.modalButton}>
                  {BUTTONS[3]}
                </Button> 
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 4, title: BUTTONS[4]})}
                  style={styles.modalButton}>
                  {BUTTONS[4]}
                </Button>                                                                                               
                <Button
                  onPress={this.onButtonPressed.bind(this, false, {index: 5, title: BUTTONS[5]})}
                  style={styles.modalButton}>
                  {BUTTONS[5]}
                </Button>                  
              </View>
            </View>
          </Modal>
	        <RefreshableListView
	          dataSource={this.state.dataSource}
	          renderRow={this.renderRow}
            loadData={this.reloadData}
            onEndReached={this.appendData}
            onEndReachedThreshold={DEVICE_HEIGTH/3}
	          renderSeparator={this.renderSeparator}
            renderFooter={this.renderFooter}              
	        /> 
        </View>   			
		);
	}
});


var styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },

  rowSeparatorHide: {
    opacity: 0.0,
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
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 3,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  qDescription:{
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 3,
    marginBottom: 3,
    color: 'gray',        
  },   
  modalButton: {
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  }, 
  innerContainer: {
    borderRadius: 10,
  },   
});

module.exports = BoardList;