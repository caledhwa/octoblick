'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
} from 'react-native';

class PushDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
  }

  render() {
    return (
      <Text style={styles.text}>
        ({this.state.details.payload.commits.length} Commits)
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#96efff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

module.exports = PushDetails;
