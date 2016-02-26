'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight,
} from 'react-native';

var moment = require('moment');
var Details = require('./Details');
var GitHub = require('./GitHub');

class Feed extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ActivityIndicatorIOS size="large" animating={true}/>
        </View>
      );
    }

    return (
        <View style={styles.container}>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
        </View>
    );
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        var feedItems = responseData;
        this.setState(
          {dataSource: this.state.dataSource.cloneWithRows(feedItems),
           showProgress: false});
      });
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={()=> this.pressRow(rowData)} underlayColor='#222'>
        <View style={styles.rowItem}>
          <Image source={{uri: rowData.actor.avatar_url}} style={styles.rowImage}/>
          <View style={{paddingLeft:20}}>
            <Text style={styles.rowText}>
              {moment(rowData.created_at).fromNow()}
            </Text>
            <Text style={[styles.rowText, styles.boldText]}>
              {rowData.actor.login} {rowData.payload.action} {GitHub.mapEvent(rowData.type)}
            </Text>
            <Text style={styles.rowText}>
              Repository: {rowData.repo.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Event Details',
      component: Details,
      passProps: {
        details: rowData
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    backgroundColor: '#333',
    flex: 1,
    justifyContent: 'flex-start'
  },
  rowImage: {
    height: 46,
    width: 46,
    borderRadius: 23
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderColor: '#5c8b94',
    borderBottomWidth: .75
  },
  rowText: {
    color: '#96efff',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold'
  },
  italicText: {
    fontStyle: 'italic'
  },
  tinyText: {
    fontSize: 10,
  },
});

module.exports = Feed;
