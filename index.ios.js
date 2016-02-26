'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Text,
  ActivityIndicatorIOS,
  TouchableHighlight,
  StatusBarIOS,
} from 'react-native';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

class OctoBlick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    }
  }

  render() {
    StatusBarIOS.setStyle('light-content');
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS animating={true} size="large" style={styles.loader}/>
        </View>
      );
    }
    if(this.state.isLoggedIn) {
      return (
        <AppContainer onRSP={this.onResetStatePressed.bind(this)} />
      );
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)} />
      );
    }
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }

  onResetStatePressed() {
    AuthService.clearAuthInfo();
    this.setState({isLoggedIn:false, checkingAuth: false});
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    alignSelf: 'center',
    color: '#96efff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

AppRegistry.registerComponent('OctoBlick', () => OctoBlick);
