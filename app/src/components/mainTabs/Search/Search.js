import React, {useEffect, useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Modal, Portal, Searchbar, Subheading} from 'react-native-paper';
import colors from '../../../../settings/colors'
import styles from "../../../../settings/styles"
import FoodBlockScroll from "../../FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../../utils/withRouteParams";
import Food from '../../Food/Food'

import {getSearch} from '../../../scraper/Scraper'
import Filters from "./Filters";
import {connect} from "react-redux";
import {ACTIONS} from "../../../state/State";
import SafeView from "../../SafeView";
import headlessNavigator from "../../../utils/headlessNavigator";
import getActiveFilters from "../../../utils/getActiveFilters";

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

//TODO: validate that a search has enough valid results i.e. it wont have info missing
//TODO: the search bar jumps up and down slightly when the keyboard is opened, probably something to do with SafeView not being the root component

const Search = connect(null, {
    add_search: (searchRes) => ({
        type: ACTIONS.ADD_SEARCH_HISTORY,
        searchRes,
    })
})(function (props) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('')

    //this is for updating the search results
    useEffect(() => {
        if (!currentSearch) return;

        let canceled = false;

        async function effect() {

            const searchRes = await getSearch(currentSearch, getActiveFilters())
            props.add_search(searchRes)

            if (!canceled) {
                setSearchResults(searchRes.results)
                setCurrentSearch('')
            }
        }

        effect();

        return () => {
            canceled = true
        };
    }, [currentSearch])

    const showModal = () => setFiltersVisible(true);
    const hideModal = () => setFiltersVisible(false);

    //TODO: run search on delish and all recipe at the same time

    let mainContent;
    if (currentSearch) {
        mainContent = <ActivityIndicator style={{alignSelf: 'center'}}/>
    } else if (searchResults.length > 0) {
        mainContent =
            <FoodBlockScroll
                onPress={(URL) => {
                    props.navigation.navigate('Food', {URL})
                }}
                blocksPerCrossAxis={2} URLs={searchResults}
                blockLength={160}/>
    } else {
        mainContent = <Subheading style={{color: '#808080'}}>Can I get uhhhh...</Subheading>
    }


    return (
        <SafeView bottom={false} style={[styles.container, {backgroundColor: colors.foodblocksRed}]}>
            <View style={{
                backgroundColor: colors.foodblocksRed,
            }}>
                <Portal>
                    {/*TODO: Make a better filter design.*/}
                    <Modal visible={filtersVisible} onDismiss={hideModal}>
                        <View style={{alignItems: 'center'}}>
                            <Filters/>
                        </View>
                    </Modal>
                </Portal>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setQuery}
                    value={query}
                    onSubmitEditing={() => setCurrentSearch(query)}
                />
                <Button color='white'
                        onPress={() => {
                            Keyboard.dismiss();
                            showModal()
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
                {mainContent}
            </View>
        </SafeView>
    )
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

export default headlessNavigator([
    {name: 'Search', component: Search, mainPage: true},
    {name: 'Food', component: FoodWithParams}
])
