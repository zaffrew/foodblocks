import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Chip, Searchbar, Subheading, Provider, Portal, Modal, Surface, TextInput, Button} from 'react-native-paper';
import SafeView from '../SafeView'
import colors from '../../../settings/colors'
import styles from "../../../settings/styles"
import {getData, search} from "../../AllRecipe";
import FoodBlockScroll from "./FoodBlockScroll";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../withRouteParams";
import Food from "../Food";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

const SearchNavigator = (props) => {
    return (
        <Navigator.Navigator screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}
                             initialRouteName="Search">
            <Navigator.Screen options={{headerShown: false}} name="Search" component={Search}/>
            <Navigator.Screen name="Food" component={FoodWithParams}/>
        </Navigator.Navigator>
    )
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {query: '', 
                    blockData: [], 
                    searchEmpty: true,
                    showFilters: false,
                    newFilters: '',
                    addFilter: '',}
    }

    onChangeText(filter) {
        this.setState({
            addFilter: filter
        })
    }

    async onSubmit(filter) {
        this.setState({
            newFilters: this.state.newFilters + ' ' + filter
        },  () => this.updateSearchResults());
        //this.updateSearchResults()
    }

    showModal = () => this.setState({showFilters: true});
    hideModal = () => this.setState({showFilters: false});

    async updateSearchResults() {
        this.setState({blockData: [], searchEmpty: false})
        const query = this.state.query + this.state.newFilters;
        console.log(query)
        const searchResults = await search(this.state.query + this.state.newFilters, 20);
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
                <Provider>
                <Portal>
                    <Modal visible={this.state.showFilters} onDismiss={this.hideModal} style={{margin:20}}>
                        <TextInput
                            label='Add a filter'
                            selectionColor={colors.foodblocksRed}
                            underlineColor={colors.foodblocksRed}
                            underlineColorAndroid={colors.foodblocksRed}
                            value={this.state.addFilter}
                            onChangeText={filter => this.onChangeText(filter)}
                            onSubmitEditing={() => this.onSubmit(this.state.addFilter)}
                        />
                    </Modal>
                </Portal>
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
                        <View style={{flexDirection: 'row'}}>
                            <Button color='white'
                                    onPress={() => console.log('Should open up filters menu')}
                                    style={{
                                    paddingLeft:10,
                                    paddingTop: 10,
                                    paddingBottom: 5}}
                                    >Filters</Button>
                        </View>

                        <View style={chipStyle.row}>
                            <Chip onPress={ () => this.onSubmit('vegan') } style={chipStyle.chip}>
                                <Text style={styles.chipText}>Vegan</Text>
                            </Chip>
                            <Chip onPress={() => this.onSubmit('halal')} style={chipStyle.chip}>
                                <Text style={styles.chipText}>Halal</Text>
                            </Chip>
                            <Chip onPress={() => this.onSubmit('gluten free')} style={chipStyle.chip}>
                                <Text style={styles.chipText}>Gluten-free</Text>
                            </Chip>
                            <Chip onPress={() => this.onSubmit('keto')} style={chipStyle.chip}>
                                <Text style={styles.chipText}>Keto</Text>
                            </Chip>
                            <Chip onPress={() => this.onSubmit('dairy free')} style={chipStyle.chip}>
                                <Text style={styles.chipText}>Dairy-free</Text>
                            </Chip>
                            <Chip onPress={this.showModal} style={chipStyle.chip} icon="plus">
                                <Text style={styles.chipText}>More</Text>
                            </Chip>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2 / 3, backgroundColor: colors.grey}}>
                { this.state.searchEmpty && <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                        <Subheading style={{color: '#808080'}}>Can I get uhhhh...</Subheading>
                    </View> }
                    <FoodBlockScroll onPress={(data) => {
                        this.props.navigation.navigate('Food', {data})}}
                                     columns={2} blockData={this.state.blockData}/>
                </View>
                </Provider>
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
        color: 'white',
    }
});

export default SearchNavigator;
