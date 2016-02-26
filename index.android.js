'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

var Login = require('./Login');

class OctoBlick extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('OctoBlick', () => OctoBlick);
