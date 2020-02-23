import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Chip, Searchbar, Subheading} from 'react-native-paper';
import SafeView from '../SafeView'
import colors from '../../../settings/colors'
import styles from "../../../settings/styles"
import FoodBlockScroll from "./FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../withRouteParams";
import Food from "../Food";

import {getData as delish_data, search as delish_search} from '../../scraper/Delish'
import {connect} from "react-redux";
import {ACTIONS, STORES} from "../../State";

const searches = 20;

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);


const Search = connect((state, ownProps) => {
    const loaded_recipes = Object.keys(state[STORES.RECIPE_CACHE])
    return {loaded_recipes}
}, {
    cacheData: (data) => {
        return {
            type: ACTIONS.CACHE_RECIPE,
            data
        }
    },
})
(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {query: '', URLs: []}
    }

    onTap() {
        console.log('Pressed')
    }

    //TODO: sometimes a single search can run without the last search ending
    //TODO: run search on delish and all recipe at the same time

    async updateSearchResults() {
        this.setState({URLs: []})
        const query = this.state.query;
        const searchResults = await delish_search(this.state.query, searches);
        for (const URL of searchResults) {
            if (!this.props.loaded_recipes.includes(URL)) {
                const data = await delish_data(URL)
                this.props.cacheData(data)
            }

            this.setState({URLs: this.state.URLs.concat(URL)});
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
                    <FoodBlockScroll onPress={(URL) => {
                        this.props.navigation.navigate('Food', {URL})
                    }}
                                     columns={2} URLs={this.state.URLs}/>
                </View>
            </SafeView>

        );
    }
})

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

const SearchNavigator = (props) => {
    return (
        <Navigator.Navigator screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}
                             initialRouteName="Search">
            <Navigator.Screen options={{headerShown: false}} name="Search" component={Search}/>
            <Navigator.Screen name="Food" component={FoodWithParams}/>
        </Navigator.Navigator>
    )
}

export default SearchNavigator;
