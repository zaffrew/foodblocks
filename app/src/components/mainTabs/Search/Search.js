import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
    Searchbar,
    Subheading,
    Provider,
    Portal,
    Button,
    Headline, Card, Modal
} from 'react-native-paper';
import colors from '../../../../settings/colors'
import styles from "../../../../settings/styles"
import FoodBlockScroll from "../FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../withRouteParams";
import Food from "../../Food";

import {SOURCES, search as scraper_search} from '../../../scraper/Scraper'
import Filters from "./Filters";
import {SafeAreaView} from "react-native-safe-area-context";

const SOURCE = SOURCES.ALL_RECIPE;
const search = async (query, num) => {
    return await scraper_search(query, num, SOURCE)
};

const searches = 20;

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

//TODO: validate that a search has enough valid results i.e. it wont have info missing
//TODO: the search bar jumps up and down slightly when the keyboard is opened, probably something to do with SafeView not being the root component


//TODO: the filters button will open up a dialog showing a filters menu
//TODO: figure out how to store filter data and pass it to the Filters.js
//the filters displayed will only be the active ones then.


const filterNames = ['Vegan', 'Halal', 'Gluten-free', 'Keto', 'Dairy-free']

class Search extends React.Component {

    state = {
        query: '',
        searchData: [],
        filtersVisible: false,
        filters: filterNames.map(e => ({name: e, active: false})),
        addFilterText: '',
    }

    constructor(props) {
        super(props);
        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    onChangeText(filter) {
        this.setState({
            addFilterText: filter
        })
    }

    onPressFilter = (filterName) => {
        const filters = this.state.filters
        const index = filters.findIndex(filter => filter.name === filterName)

        filters[index] = {name: filterName, active: !filters[index].active}

        this.setState({filters});
        this.updateSearchResults()
    }

    toggleModal() {
        this.setState({filtersVisible: !this.state.filtersVisible})
    }

    showModal = () => this.setState({filtersVisible: true});
    hideModal = () => this.setState({filtersVisible: false});

    //TODO: run search on delish and all recipe at the same time

    async updateSearchResults() {
        //react state is actually kinda async so i have to do await here and
        // down on setting the new state or there will be weird behavior
        await this.setState({searchData: []});
        let query = this.state.query;
        if (!query) {
            return;
        }
        this.state.filters.forEach(({name, active}) => {
            if (active) {
                query += ' ' + name
            }
        })
        const searchData = await search(query, searches);
        await this.setState({searchData})
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: colors.foodblocksRed}]}>
                <View style={{
                    backgroundColor: colors.foodblocksRed,
                }}>
                    <Portal>
                        {/*TODO: Make a better filter design.*/}
                        <Modal visible={this.state.filtersVisible} onDismiss={this.hideModal}>
                            <View style={{alignItems: 'center'}}>
                                <Filters filters={this.state.filters} filterPressed={this.onPressFilter}/>
                            </View>
                        </Modal>
                    </Portal>
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
                    <Button color='white'
                            onPress={() => this.showModal()}
                            style={{
                                paddingLeft: 10,
                                paddingTop: 10,
                                paddingBottom: 5,
                                alignSelf: 'center'
                            }}>
                        Filters
                    </Button>
                </View>
                <View style={{flex: 1, backgroundColor: colors.grey}}>
                    {this.state.query ?
                        <FoodBlockScroll
                            onPress={(URL) => {
                                this.props.navigation.navigate('Food', {URL})
                            }}
                            columns={2} URLs={this.state.searchData}/> :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Subheading style={{color: '#808080'}}>Can I get uhhhh...</Subheading>
                        </View>
                    }
                </View>
            </SafeAreaView>
        )
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
        color: 'white',
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
};

export default SearchNavigator;
