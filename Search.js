'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

var SearchResults = require('./SearchResults');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="query" autoCapitalize="none" autoCorrect={false} placeholderTextColor='#34757e' onChangeText={(text) => this.setState({searchQuery: text})} />
          <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
    );
  }

  onSearchPressed() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        query: this.state.searchQuery
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    //fontFamily: 'Inconsolata',
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
    //fontFamily: 'Inconsolata',
    fontSize: 18,
    color: '#000',
  },
});

module.exports = Search;
