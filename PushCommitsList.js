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

class PushCommitsList extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.details.payload.commits),
    };
  }

  render() {
    return (
      <ListView automaticallyAdjustContentInsets={false} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>{rowData.sha.substring(0,6)}</Text> - {rowData.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    padding: 10,
    borderColor: '#5c8b94',
    borderBottomWidth: .75,
  },
  rowText: {
    color: '#96efff',
    fontSize: 12,
  },
  boldText: {
    fontWeight: 'bold'
  },
});

module.exports = PushCommitsList;
