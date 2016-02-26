'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class PullRequestDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: props.details
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.pr]}>
          ({this.state.details.payload.pull_request.commits} Commits)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    padding:20,
  },
  pr: {
    paddingTop:30,
    color: '#96efff',
    fontSize: 16,
  },
});

module.exports = PullRequestDetails;
