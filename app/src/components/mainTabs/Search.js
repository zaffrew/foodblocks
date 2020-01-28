import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Searchbar, Title, Card, Subheading, Chip } from 'react-native-paper';
import SafeView from '../SafeView'
import VerticalScroll from '../VerticalScroll'
import colors from '../../../settings/colors'
import styles from "../../../settings/styles"

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userQuery: '',}
    }

    onTap() {
        console.log('Pressed')
    }

    render() {
        return (
            <SafeView style={styles.container, {backgroundColor: colors.foodblocksRed}}>
                <View style={styles.centeredContainer, {backgroundColor: colors.foodblocksRed, height: 185}}>
                    <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ userQuery: query }); }}
                    value={this.state.userQuery}
                    />
                    <View>
                        <Subheading style={{color:'white', paddingHorizontal:20, paddingTop:10, paddingBottom:5}}>Filters</Subheading>

                        <View style={chipStyle.row}>
                          <Chip onPress={this.onTap} style={chipStyle.chip}>
                            <Text style={styles.chipText}>Vegan</Text>
                          </Chip>

                          <Chip onPress={this.onTap} style={chipStyle.chip}>
                            <Text style={styles.chipText}>Halal</Text>
                          </Chip>

                        <Chip onPress={this.onTap} style={chipStyle.chip}>
                          <Text style={styles.chipText}>Gluten-free</Text>
                        </Chip>

                        <Chip onPress={this.onTap} style={chipStyle.chip}>
                          <Text style={styles.chipText}>Keto</Text>
                        </Chip>

                        <Chip onPress={this.onTap} style={chipStyle.chip}>
                          <Text style={styles.chipText}>Dairy-free</Text>
                        </Chip>

                      </View>
                    </View>
                </View>
                <View style={{backgroundColor: colors.grey}}>
                      <VerticalScroll onTap={this.onTap}></VerticalScroll>
                </View>
            </SafeView>
            
        );
    }
}

const cardStyle = StyleSheet.create({
    container: {
      width: 150,
      height: 150,
      margin: 8,
    },
    content: {
      padding: 4,
    },
    card: {
      margin: 4,
    },
    image: {
        width: 100,
        height: 100,
    }
  });

const chipStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
      },
      chip: {
        backgroundColor: colors.lightRed,
        color: 'white',
        margin: 4,
        paddingHorizontal: 10,
      },
      chipText: {
        color: "white",
      }
    });

