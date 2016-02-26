'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';

class IssueCommentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: props.details
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.issue,styles.bold]}>
          Issue #{this.state.details.payload.issue.id} ({this.state.details.payload.issue.state})
        </Text>
        <Text style={[styles.issue,styles.italic]}>
          {this.state.details.payload.issue.title}
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
  issue: {
    paddingTop:30,
    color: '#96efff',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
});

module.exports = IssueCommentDetails;
