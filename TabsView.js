
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} = React;

var homeBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAAEQ2dCSVAAIAIr1bN/AAAADUlIRFIAAAA8AAAAPAgGAAAAOvzZcgAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozOUM3RDg3QTY0Q0JFMzExQjA1MDgzN0ZDRkVDMjI1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEM0IwRjAwOUQ3MkUxMUUzOUJBRThCMjQ0NUIzQUE1QSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEM0IwRjAwOEQ3MkUxMUUzOUJBRThCMjQ0NUIzQUE1QSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEFGRkY1MEYyQzIwNjgxMTgyMkFFQTU5OUM2ODlBRUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzlDN0Q4N0E2NENCRTMxMUIwNTA4MzdGQ0ZFQzIyNTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5bsYFGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tJREFU7ZpfSFNRHMe9f7zL6QYuU9twIkwh5h+6amj+A9Fue5kMWTbBmUvcTDabm38um7rb7rm7z9VD0ENBEPRUENVDD4X20EN/iCKKiCghiiJESHNZ6+nCYWiZbnd/OB84D2O/c76/D9yde89lOTkIBAKBQCAQ2UppaWmN1+t9PjU19Vav1zdltazBYOgKhULLoijGRFGMhcPh1erq6t6slKVp2g4AWJdkpRGJRH61tbX5skq2s7MzEIlEfkuSLMsu+Xy+V7B4T0/PeRzHiYwWxXGc7O3tvQiLjY+PP1Or1TqlUqlxOp0L8HeDg4M3KYoqyEhZiqIKhoaGbsFCw8PDdxUKhVqqIUlSYbPZrsI1brf7kUql2p9RsiqVqtTtdj+GRaxW62WCIHLjazEMwxiGAXDtzMzM+5KSkuqMkC0uLj4wPT39Dhbo7u4+g2EY9rd5jY2NJwEAUWlOKBRaNhgMXWktW1FR0T4/P/9NaloQhJ8NDQ2O7c6vrKw8wnHcijQfABCtr68/kZaytbW1x3ie/yE1y3HcSlVV1dGdPJiwLLv0v1eIrLS3t/vh204gEPio1WoP7nQ9tVqt9Xg8T2Hpvr6+KwRBUKm+7RBms/kc3JjX631RWFhYnqBd/ja89sjIyP28vLzClMjm5uYqBwYGrsc1dC+RDeE4TlgslgtwxsTExEuNRlMhq2x+fv6+sbGxh3AjNpvtKkmSimTkdXR0TME/mWAw+KmsrOyQLLJFRUWVk5OTb2BZk8kkJntTqampsfI8vwYdPL4bjUZLUmX1en3T7OzsF1i2ubn5lFxXVnl5+WE4WxCEjdbW1tNJCTMajZZwOLwaf9qRe++IzxdFMWY2m88m9ODR0tLiEQRhY7OwdBAWRTFmt9tvUBSVn5B7LLyw3+9/nS7C/f391+DPDofjzq4DPB7PE2nB0dHRB0qlcm+6CGMYhplMJhHeyHYdUFdXd5xl2Q9Wq/USSZJ74kNTKQy/TXE6nQs0TdtlC02lcHaGImEkjIRTEupyuRa3eliIHy6XazHjhbcru5P10lo40XVIGAkjYSSMhJEwEv53KMdxKxzHrSSqLu2FdTodrdPp6ETVpVw4lUM24a3eYMo5AADrsgkzDAN4nl+bm5v7utk/c5IoGQ0Gg58BAFGGYUAOAoFAIBAIBCKN+AOhkXipAAAAAElFTkSuQmCC';
var profileBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAAEQ2dCSVAAIAIr1bN/AAAADUlIRFIAAAA8AAAAPAgGAAAAOvzZcgAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozOUM3RDg3QTY0Q0JFMzExQjA1MDgzN0ZDRkVDMjI1NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NDAzM0QwQ0Q3NDAxMUUzOUJBRThCMjQ0NUIzQUE1QSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NDAzM0QwQkQ3NDAxMUUzOUJBRThCMjQ0NUIzQUE1QSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEFGRkY1MEYyQzIwNjgxMTgyMkFFQTU5OUM2ODlBRUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzlDN0Q4N0E2NENCRTMxMUIwNTA4MzdGQ0ZFQzIyNTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7EytwOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFBJREFU7VrfayJXFNbcOhpcG3WiWYSMW3fTNgbUSHI1P2dCQt9a6MvqWDYho04rSRiSYYxKglFHJ/9H6aZ9K5RClm0hDy20bAsNlE1hNw9l96H0ob/Csrttk/bpwkXqblIdHdv54L7N/c75vOece+5Bg0GHDh06dOjQoUNHF8Nut1MMw+SSyeStfD7/QJblJ+Vy+UQUxSOO4/YZhsk5nc6X/hNCWZa9WavV/tzd3f3rWUtRlFOWZW/a7XaqK8X6/f43SqXSb88TWr/K5fJJMBhku0rs1NSUoCjKKS4knU5/CiHkSZK8BgAgAAAESZLXIIR8KpX6pO60z6anp9e7QmwgEIgpinKGnBdF8cjn8zHP2+fz+RhRFI9w0YFAIKb5nC2XyyfIaZ7nD8xms+28+81ms43n+QM8vDWd0/F4/D38ZC0WS99FOSwWSx9+0izL7mlSrMPh8KK8VRTljKKo6L/loigqitJCUZRTh8Ph1ZxgmqY30amkUqnbzfKlUqnbiI+m6U3NCeY4bh85CCFMN8sHIUwjPo7j9jUnuFAoPEQOkiR5tVk+kiSvIr5CofBQc4JlWX6CHAQAEM3yAQAIxFetVp9qWvBFrqKuFYyHtMvleqVZPqfT6dN0SCeTyVvIwXA4fKNZvnA4fEPTRQu/llrhIP4DavJacjgcV1RsPK5osttiWXavFa3lxsbGXc23lv/Lx4PBYDAEg8F4/fPQ6/VOnieM65+HwWAw3rUDgIWFhZ1G34+Ojr6F/0iKopzNzMyIXTPxMJvNLy4vL3+MC65UKo8afS+K4nf4txzH7RMEYdW80J6enhdmZ2elYrH4U/2sKpPJfN5oH563aG1vb/84MTGxYjQaezQp1uVyvSoIwuE/DeVYlt3r6+sbbLS3v7//5cXFxQ/xgofWysrKl5ob4Y6MjLxZqVQe4Y5ms9ljCCFPEMSl8/IQBHEJQshns9ljnKtUKv06NDT0mibEjo2NcfjcWZblxzRNbzbzYgIAEDRNb8qy/Bh/QAQCgesdFRsKhRJ4Nc5ms8cejyfUKn6PxxPCT7tWq/0xPDz8ekfEut1uPx7GgiAc2my2y622Y7PZLuO1oVgs/tz2nAYAmNbX179FTkiSdM9qtbrUsme1Wl2SJN3DCtkXba3eDMPk8JxtZRg/K7zxnI5EIu+0RWxvb699Z2fnF2SYYZhcJ56gW1tbP5hMpl7Vjc7NzRWwUL4PADC1M5UkSbqP7Eej0YyqBo1GoxE3CCHk210sx8fHU8j+2tra16oaGxwchHgH1Yl+lyAIK96RtWJ+1hDz8/PbyFAikfigU/d/IpF4H/kxOTm5ppqhpaWljzoZzgiRSORt5EcsFntXNUN4/rrdbn+nBA8MDIxgefyVaoYEQfjmon9hUHtlMpnPVBO8urp6R2uCeZ4/UE0wRVETgiAc5nK576vV6tNOiaxWq7/n8/kHgiAcejyeUYMOHTp06NChQ4cODeBvHnHacwAAAABJRU5ErkJggg==';
var favoritesBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAAEQ2dCSVAAIAIr1bN/AAAADUlIRFIAAAAwAAAAMAgGAAAAVwL5hwAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRCMDg4RjRCMjA2ODExODIyQUY4NTc0NDVCRTg0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUY4OTEzQUNEQkExMUUzQThDMkUzMTlBODA0MDRGMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUY4OTEzOUNEQkExMUUzQThDMkUzMTlBODA0MDRGMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDg4MDExNzQwNzIwNjgxMTgwODNEMjY4MDA4NENEQTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjY0QjA4OEY0QjIwNjgxMTgyMkFGODU3NDQ1QkU4NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz695thkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHVJREFU7VdbaGNVFE1ukmnzvOSmrxvzagoziW3aijZtU5KYjGmITdqUNs/SR5I2bUhp2mY5IqjUDwdnBB9fjohgQRwq4ow/yryoLwY/FFFwnFFRRlA/FEGogtKZ408uhGCVSdLYQhbk555z1l0r59x91ubx6qijjjrqqGOfYLPZNux2+8lDKb65ubknn8/fAnCbZVnroTMwOTl5AQABQCKRyLuHSrzBYBgGQObn579JJBJfACAdHR2jh0I8n8+nZmdnPwNABgcHH+vr63sIAEkkEtcoihIeeANdXV0JACQWi33IPYtEItsASE9Pz9KBFi8UCsWLi4vfAyAWiyXJPTebzVMASCaT+UkkEskOrIH+/v5HAJBQKHSxdGxiYuIdAMRms20cSPESiaR5ZWXlNwDEaDQ+WDqu0+mOAyC5XG5HKpWyB0a4SCSSqdVqWyAQ2AJAxsbG3txrbiAQeB0ACQaD5zQajb3mx6mxsZHR6/UPWK3WE36//7VkMnm9cFkRACSbzf4ik8nUe60Xi8VNmUzmR25+Pp+/lUqlbgQCgS2r1XpCr9d7JBJJc1VFWyyWVDAYPJdOp29yLy79xePxqw6H49S/iS82YbfbT8ZisQ/24kun0zfHx8ff6u7uXqhIvFgsVuXz+V2OeHl5+ddwOHzZ6XSeNpvNcYZhjvH5fEEFd4aAYZhjJpMp4nQ6T4dCoUvZbPbnoh3aFYvFqopMOByOp7jtbmpq6tzvY6pSqcy5XG4HAHG73c9V5XL1eDxnuB1QKpVH90u8Uqk8urS09AMA4vP5Nnk8Hr9a8UDg9/vPAiALCwvf0TRtrLZ4mqbbk8nk9UKVOl/J0fxHCASCIxMTE28DIHNzc5/L5XJttbilUik7PT39CQASDoevCASCI/tV8yVc9YjH41clEklrFUqzkuOcmpr6SCQSSff1I2toaKBnZmY+LUSGS5XyhUKhi9yuVlxx7iQ2pFKpryqtFHa7/clC3/C1TCa7q6a3cmtr670AyPT09MflckSj0fcBEI1G46h5BtLpdK5Cu7hdLgeXUNvb233/R+MyV6jXr5TL4fF4XgBAent7MzU3MDQ09EShbXy8XA6r1fowAOJwOE7V3IDP59sEQDo7O2fL5TCZTBEAJBAIbNXcQDQafQ8A0Wq1ztIxiqKEAwMDj05OTl4Ih8NXbDbbhkAgaCidx7LsAFf/a26Ai9cKhUJXnF6dTufTiUTiWmlETqVSN1wu17PFl59UKmW5Xrmm4imKEnExm6IoIU3TxuHh4ReLBUcikW2DweDV6XTHw+Hw5eIxr9f7EhcKV1dX/wBAhEKhuGYGaJo2FoLdtyMjI68Wd1jBYPA8y7IDpWva2truGx0dfaO4g/P7/WeTyeSXAIhKpTLXzIBWq72/+B9dX1//y+fzbapUqrv/ay3DMCav1/vy2tran8UcNb0LNBqNA8DtXC73u9vtfl6hUOjvlEMul2tcLtczuVxuJ5/P76rValtNv4OWlpZ7qtGANzY2MgzDmHh11FFHHXXUUQb+BnRiZIwAAAAASUVORK5CYII=';

var QuestionsList = require('./QuestionsList');
var HomeView = require('./HomeView');
var FavoriteView = require('./FavoriteView');
var MeView = require('./MeView');
var TimerMixin = require('react-timer-mixin');
var Gateway = require('./Gateway');

var TabsView = React.createClass({
  
  mixins: [TimerMixin],

  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'Fusion360 Forum',

  componentDidMount: function() {
    this.setInterval(()=>{
      Gateway.refreshToken();
    }, 1000*60*60*7.9);
  },

  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  },

  // _homeView: function() {
  //   return (
  //     <QuestionsList 
  //       board={this.props.board} 
  //       navigator={this.props.navigator} />
  //   );
  // },

  _homeView: function() {
    return (
      <HomeView />
    );
  },

  _favView: function() {
    return (
      <FavoriteView />
    );
  },

  _meView : function(){
    return (
      <MeView />
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="#005BFF"
        barTintColor="#F6F6F6">
        <TabBarIOS.Item
          title="Home"
          icon={{uri: homeBase64Icon, scale: 1.8}}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._homeView()}
          
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Favorites"
          icon={{uri: favoritesBase64Icon, scale: 1.4}}          
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          {this._favView()}

        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Me"
          icon={{uri: profileBase64Icon, scale: 1.8}}                    
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._meView()}
          
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabsView;