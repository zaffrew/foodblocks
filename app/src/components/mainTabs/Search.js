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

import {SOURCES, search as scraper_search} from '../../scraper/Scraper'

const SOURCE = SOURCES.ALL_RECIPE;
const search = async (query, num) => {
    return await scraper_search(query, num, SOURCE)
};

const searches = 20;

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

//TODO: validate that a search has enough valid results i.e. it wont have info missing
//TODO: the search bar jumps up and down slightly when the keyboard is opened, probably something to do with SafeView not being the root component

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {query: '', searchData: []};
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    onTap() {
        console.log('Pressed')
    }

    //TODO: run search on delish and all recipe at the same time

    async updateSearchResults() {
        //react state is actually kinda async so i have to do await here and
        // down on setting the new state or there will be weird behavior
        await this.setState({searchData: []});
        const query = this.state.query;
        const searchData = await search(query, searches);
        await this.setState({searchData})
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
                                     columns={2} URLs={this.state.searchData}/>
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

const SearchNavigator = (props) => {
    return (
        <Navigator.Navigator screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}
                             initialRouteName="Search"
                             headerMode='none'>
            <Navigator.Screen options={{headerShown: false}} name="Search" component={Search}/>
            <Navigator.Screen name="Food" component={FoodWithParams}/>
        </Navigator.Navigator>
    )
};

export default SearchNavigator;
