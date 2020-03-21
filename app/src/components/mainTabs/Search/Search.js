import React from 'react'
import {StyleSheet, View, Keyboard} from 'react-native'
import {
    Searchbar, Subheading, Portal, Button, Modal, ActivityIndicator
} from 'react-native-paper';
import colors from '../../../../settings/colors'
import styles from "../../../../settings/styles"
import FoodBlockScroll from "../../FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../../utils/withRouteParams";
import Food from "../../Food";

import {search} from '../../../scraper/Scraper'
import Filters from "./Filters";
import {SafeAreaView} from "react-native-safe-area-context";
import {connect} from "react-redux";
import {ACTIONS} from "../../../state/State";
import moment from "moment";

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

//TODO: validate that a search has enough valid results i.e. it wont have info missing
//TODO: the search bar jumps up and down slightly when the keyboard is opened, probably something to do with SafeView not being the root component

const Search = connect(state => ({filters: state.user_info.filters}), {
    add_search: (query, filters) => ({
        type: ACTIONS.ADD_SEARCH_HISTORY,
        query,
        filters,
        time: moment().toISOString()
    })
})(class extends React.Component {

    state = {
        searchedYet: false,
        searching: false,
        query: '',
        searchURLs: [],
        filtersVisible: false,
        addFilterText: '',
    };

    showModal = () => this.setState({filtersVisible: true});
    hideModal = () => this.setState({filtersVisible: false});

    //TODO: run search on delish and all recipe at the same time

    updateSearchResults = async () => {
        let query = this.state.query;
        if (!query) {
            return;
        }

        //react state is actually kinda async so i have to do await here and
        // down on setting the new state or there will be weird behavior
        await this.setState({searching: true, searchedYet: true, searchURLs: []});

        const activeFilters = this.props.filters.filter(({active}) => active);
        this.props.add_search(query, activeFilters)

        activeFilters.forEach(filter => {
            query += ' ' + filter
        });


        const searchRes = await search(query);
        await this.setState({searching: false, searchURLs: searchRes.results})
    };

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
                                <Filters/>
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
                            onPress={() => {
                                Keyboard.dismiss();
                                this.showModal()
                            }}
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
                    {this.state.searchedYet ?
                        (this.state.searching ?
                                <ActivityIndicator/> :
                                <FoodBlockScroll
                                    onPress={(URL) => {
                                        this.props.navigation.navigate('Food', {URL})
                                    }}
                                    blocksPerCrossAxis={2} URLs={this.state.searchURLs}
                                    blockLength={160}/>
                        ) : <View style={{
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
});

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
