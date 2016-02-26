'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
    }
  }
  render() {
    var errorCtrl = <View />;
    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.loginError}>
        That username and password combination did not work
      </Text>;
    }
    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.loginError}>
        We experienced an unexpected issue.
      </Text>;
    }

    return (
      <View style={styles.container}>
        <Icon name="github-square" size={240} color="#5c8b94" />
        <Text style={styles.text}>OctoBlick</Text>
        <TextInput style={styles.input} placeholder="username" autoCapitalize="none" autoCorrect={false} placeholderTextColor='#34757e' onChangeText={(text) => this.setState({username: text})} />
        <TextInput style={styles.input} placeholder="password" secureTextEntry={true} placeholderTextColor='#34757e' onChangeText={(text) => this.setState({password: text})} />
        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        {errorCtrl}
        <ActivityIndicatorIOS animating={this.state.showProgress} size='large' style={styles.progress} color="#34757e"/>
      </View>
    );
  }

  onLoginPressed() {
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({showProgress: false}, results));
      if (results.loginSuccess && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }
}

var styles = StyleSheet.create({
    container: {
      backgroundColor: '#333',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    progress: {
      marginTop: 20,
    },
    text: {
      alignSelf: 'center',
      color: '#96efff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    error: {
      alignSelf: 'center',
      color: '#d13737',
      fontSize: 10,
      fontWeight: 'bold',
      padding: 10,
    },
    input: {
      height: 50,
      marginLeft: 50,
      marginTop: 10,
      padding: 5,
      marginRight: 50,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#96efff',
      fontSize: 25,
      color: '#ccf',
    },
    button: {
      height: 50,
      width: 150,
      marginLeft: 30,
      marginTop: 10,
      marginRight: 30,
      borderRadius: 5,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#34757e',
    },
    buttonText: {
      fontSize: 18,
      color: '#000',
    },
  }
);

module.exports = Login;
