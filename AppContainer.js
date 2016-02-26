'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  TouchableHighlight,
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var Feed = require('./Feed');
var Search = require('./Search');

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return (
      <TabBarIOS style={styles.container} barTintColor="#000" tintColor="#5c8b94">
        <Icon.TabBarItem title="Feed" selected={this.state.selectedTab == 'feed'}
          iconName="feed"
          onPress={()=> this.setState({selectedTab: 'feed'})}>
          <NavigatorIOS style={{flex:1}} barTintColor="#000" titleTextColor="#5c8b94" tintColor="#5c8b94" initialRoute={{component: Feed, title: 'Feed'}}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem  title="Search" selected={this.state.selectedTab == 'search'}
          iconName="search"
          onPress={()=> this.setState({selectedTab: 'search'})}>
          <NavigatorIOS style={{flex:1}} barTintColor="#000" titleTextColor="#5c8b94" tintColor="#5c8b94" initialRoute={{component: Search, title: 'Search'}}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem title="Log out" selected={this.state.selectedTab == 'reset'}
          iconName="sign-out"
          onPress={this.onReset.bind(this)} />
      </TabBarIOS>
    );
  }

  onReset() {
    if (this.props.onRSP) {
      this.props.onRSP();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = AppContainer;
