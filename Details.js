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
import PushDetails from './PushDetails';
import IssueCommentDetails from './IssueCommentDetails';
import PullRequestDetails from './PullRequestDetails';
import PushCommitsList from './PushCommitsList';
import GitHub from './GitHub';
import moment from 'moment';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
  }

  render() {

    var info = <View></View>;
    var list = <View></View>;
    switch(this.state.details.type) {
      case 'PushEvent':
        info = <PushDetails details={this.state.details} />;
        list = <PushCommitsList details={this.state.details} />;
        break;
      case 'IssueCommentEvent':
        info = <IssueCommentDetails details={this.state.details} />;
        break;
      case 'PullRequestEvent':
        info = <PullRequestDetails details={this.state.details} />;
        break;
    }

    return (
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Image source={{uri: this.state.details.actor.avatar_url}} style={styles.rowImage}/>
            <Text style={styles.rowText}>
              {moment(this.state.details.created_at).fromNow()}
            </Text>
            <Text style={[styles.rowText, styles.bold]}>
              {this.state.details.actor.login} {this.state.details.payload.action} {GitHub.mapEvent(this.state.details.type)}
            </Text>
            <Text style={styles.rowText}>
              Repository: {this.state.details.repo.name}
            </Text>
            <View style={{padding:10}}>
              {info}
            </View>
          </View>
          {list}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 80,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: -70,
  },
  rowImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  rowText: {
    color: '#96efff',
    fontSize: 22,
  },
  bold: {
    fontWeight: 'bold'
  },
  italicText: {
    fontStyle: 'italic'
  },
  tinyText: {
    fontSize: 16,
  },
});

module.exports = Details;
