import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Chip, Searchbar, Subheading} from 'react-native-paper';
import SafeView from '../SafeView'
import colors from '../../../settings/colors'
import styles from "../../../settings/styles"
import {getData, search} from "../../AllRecipe";
import FoodBlockScroll from "./FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../withRouteParams";
import Food from "../Food";

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

const SearchNavigator = (props) => {
    return (
        <Navigator.Navigator headerMode={"none"} initialRouteName="Search">
            <Navigator.Screen name="Search" component={Search}/>
            <Navigator.Screen name="Food" component={FoodWithParams}/>
        </Navigator.Navigator>
    )
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {query: '', blockData: []}
    }

    onTap() {
        console.log('Pressed')
    }

    async updateSearchResults() {
        const query = this.state.query;
        const searchResults = await search(this.state.query, 20);
        for (const URL of searchResults) {
            this.setState({blockData: this.state.blockData.concat(await getData(URL))});
            if (query !== this.state.query) {
                return;
            }
        }
    }


    render() {
        return (
            <SafeView style={[styles.container, {backgroundColor: colors.foodblocksRed}]}>
                <View style={[styles.centeredContainer, {
                    flex: 1 / 3,
                    backgroundColor: colors.foodblocksRed,
                    height: 185
                }]}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={query => {
                            this.setState({query})
                        }}
                        value={this.state.query}
                        onSubmitEditing={() => {
                            this.updateSearchResults()
                        }}
                    />
                    <View>
                        <Subheading style={{
                            color: 'white',
                            paddingHorizontal: 20,
                            paddingTop: 10,
                            paddingBottom: 5
                        }}>Filters</Subheading>
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
                <View style={{flex: 2 / 3, backgroundColor: colors.grey}}>
                    <FoodBlockScroll onPress={(data) => {
                        this.props.navigation.navigate('Food', {...data})
                    }}
                                     columns={2} blockData={this.state.blockData}/>
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

export default SearchNavigator;
