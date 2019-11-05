import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

class Board extends React.Component {
  render() {
     return (
      <View style = {{height: 200}}>
        <Row rowNum = {0}/>
        <Row rowNum = {1}/>
        <Row rowNum = {2}/>
      </View>
    );
  }
}

class Row extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rowNum: props.rowNum
    }
  }
  
  getBorders(x, y) {
    return [y != 0, x != 2]
  }

  render() {
    return (
      <View flex={1} flexDirection = {'row'} >
        <Box  border={'red'} color={'white'} borders = {this.getBorders(0, this.state.rowNum)}/>
        <Box  border={'red'} color={'white'} borders = {this.getBorders(1, this.state.rowNum)}/>
        <Box  border={'red'} color={'white'} borders = {this.getBorders(2, this.state.rowNum)}/>
      </View>
    );
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      border: props.border,
      color: props.color,
      size: props.size,
      borders: props.borders
    };
  }

  render() {
    let borderWidth = 4
    let top = this.state.borders[0] ? borderWidth : 0
    let right = this.state.borders[1] ? borderWidth : 0

    return (
      <View
        backgroundColor={this.state.color}
        borderColor={this.state.border}
        borderTopWidth = {top}        
        borderRightWidth = {right}    
        flex = {1}
      />
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to
          get a shareable url.
        </Text>
        <Card>
          <AssetExample />
        </Card>
        <Board />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
