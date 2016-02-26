'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');

class SearchResults extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      query: props.query,
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch() {
    var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.query);

    fetch(url)
    .then((response)=> response.json())
    .then((responseData)=> {
      this.setState(
        {repositories: responseData.repositories,
         dataSource: this.state.dataSource.cloneWithRows(responseData.items)});
    })
    .finally(()=> {
      this.setState({showProgress:false});
    });
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ActivityIndicatorIOS size="large" animating={true}/>
        </View>
      );
    }

    return (
        <View style={styles.container}>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
        </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowItem}>
        <Text style={[styles.rowText,{fontSize:16, fontWeight:'600', padding: 10}]}>{rowData.full_name}</Text>
        <View style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom:10
        }}>
        <View style={styles.repoCell}>
          <Icon name="star-o" size={20} color="#5c8b94" />
          <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
        </View>
        <View style={styles.repoCell}>
          <Icon name="code-fork" size={20} color="#5c8b94" />
          <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
        </View>
        <View style={styles.repoCell}>
          <Icon name="exclamation-circle" size={20} color="#5c8b94" />
          <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    backgroundColor: '#333',
    flex: 1,
    justifyContent: 'flex-start'
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#5c8b94',
    borderBottomWidth: .75
  },
  rowText: {
    color: '#96efff',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold'
  },
  italicText: {
    fontStyle: 'italic'
  },
  tinyText: {
    fontSize: 10,
  },
  repoCell: {
    width: 75,
    alignItems: 'center'
  },
  repoCellLabel: {
    textAlign: 'center',
    color: '#5c8b94',
    fontSize: 12,
  },
});

module.exports = SearchResults;
