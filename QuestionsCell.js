
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
} = React;

var Gateway = require('./Gateway');
var Config = require('./Config');
var moment = require('moment');
var reactNativeStore = require('react-native-store');


var LabelText = React.createClass({

  renderNewLabel(){
    return (
      <Text style={styles.qNew}>UnAnswered</Text>
    )
  },

  renderSolvedLabel(){
    return (
      <Text style={this.props.question.conversation.solved ? styles.qSolved : styles.qUnSolved}>Solved</Text>
    )
  },

  render(){
    if (this.props.question.conversation.messages_count-1 === 0) {
      return this.renderNewLabel();
    }else{
      return this.renderSolvedLabel();
    }
  },

});

var QuestionsCell = React.createClass({

  propTypes: {
    question: React.PropTypes.object,
    onSelect: React.PropTypes.func,
  },

  async markAsRead(message) {
    this.setState({
      readed: true,
      toRead: 0,
    });
   }, 

  checkIfReadOrNot(question) {

    var that = this;
    reactNativeStore.model(Config.TB_READED).then((db)=>{
      db.find({id:question.id}).then((data)=>{
        if (data.length>0) {
          var lastSavedCount = data[0].messages_count;
          var curCount = question.conversation.messages_count;
          var readOrNot = false;
          var toRead = question.conversation.messages_count - 1;
          if (lastSavedCount) {
            lastSavedCount = parseInt(lastSavedCount);
            readOrNot = (curCount > lastSavedCount) ? false : true;
            toRead = curCount - lastSavedCount;
          }else{
            readOrNot = false;
          }

          that.setState({
            readed: readOrNot,
            toRead: toRead,
          });

        }else{

          that.setState({
            readed: false,
            toRead: question.conversation.messages_count - 1,
          });
        }
      });
    });


  }, 

  handleCellPress() {
    this.markAsRead(this.props.question);
    this.props.onSelect(this.props.question)
  },


  componentDidMount() {
    this.checkIfReadOrNot(this.props.question);
  },

  getInitialState: function() {
    return {
      readed: true,
    };
  },

  render: function() {

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    var desc = this.props.question.body || "";
    desc = desc.substr(0,250);
    var regex = /(&nbsp;|<([^>]+)>)/ig;
    desc = desc.replace(regex, "");

    var readOrNot = this.state.readed ? styles.circleRead : styles.circleUnread;
    var latestDate = moment(this.props.question.conversation.last_post_time).fromNow();
    return (
      <View>
        <TouchableElement
          onPress={this.handleCellPress}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.flexContainer}>
            <View style={styles.fixedCell}>
              <View style={readOrNot}></View>
            </View>
            <View style={styles.flexCell}>
              <View style={styles.flexCreatorCell}>
                <Text style={styles.qcreatorText}>
                  {this.props.question.author.login}
                  {' '}&bull;{' '}
                  <Text>{this.props.question.post_time_friendly}</Text>                
                </Text>
                <LabelText question={this.props.question} />
              </View>            
              <Text style={styles.qTitle} numberOfLines={2}>{this.props.question.subject}</Text>
              <Text style={styles.qDescription} numberOfLines={2}>{desc}</Text>
              <Text style={styles.qLatestText} numberOfLines={1}>
                  <Text style={styles.qViewsNum}>{latestDate}</Text>
                  {' '}&bull;{' '}
                  <Text style={styles.qViewsNum}>{this.state.toRead}/{this.props.question.conversation.messages_count-1} replies</Text>
                  {' '}&bull;{' '}
                  <Text style={styles.qViewsNum}>{this.props.question.metrics.views} views</Text>
              </Text>            
            </View>                      
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flexContainer:{
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  flexCell:{
    flexDirection: 'column',
    marginLeft: 24,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  flexCreatorCell:{
    flexDirection: 'row',
  },
  fixedCell:{
    height: 22,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
  },
  circleUnread:{
    backgroundColor: 'blue',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  circleRead:{
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  qLatestText:{
    fontSize: 13,
    alignSelf: 'flex-start', 
    marginTop: 5,
    marginBottom: 5,
  },
  qcreatorText:{
    flex: 1,
    fontSize: 13,
    justifyContent: 'flex-start', 
    marginTop: 5,
    marginBottom: 1,
  },
  qSolved:{
    fontSize: 13,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 1, 
    backgroundColor: '#C8C8C8', 
    color: '#FFFFFF'
  },
  qNew:{
    fontSize: 13,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 1, 
    backgroundColor: '#FA7F0A', 
    color: '#FFFFFF'
  },  
  qUnSolved:{
    color: 'white',
    backgroundColor: 'white',
  },
  qCreatedTime: {
    fontSize: 9,
    alignSelf: 'flex-start',
  },
  qCreatedDate:{
    fontSize: 12,
    alignSelf: 'flex-start', 
  },
  qViewsNum: {
    fontSize: 11,
    alignSelf: 'flex-start',
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
  qAuthor:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  qAuthorName:{
    flex: 1,
    margin: 2,
    fontSize: 10,
  },
  qAuthorTitle:{
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
  
});

module.exports = QuestionsCell;
