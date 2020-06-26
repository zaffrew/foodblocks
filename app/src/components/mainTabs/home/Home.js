import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../../utils/withRouteParams";
import Food from '../../Food/Food'
import UserPage from '../userPage/UserPage.js';
import FoodBlockScroll from "../../FoodBlockScroll";
import {Headline, Title, FAB, Subheading, Text, Card} from "react-native-paper";
import headlessNavigator from "../../../utils/headlessNavigator";
import RecommendedFoods from "./RecommendedFoods";
import {getRecipe} from '../../../scraper/Scraper'
import {SafeAreaView} from "react-native-safe-area-context";
import RecentFoods from "./RecentFoods";
import RecentSearches from "./RecentSearches";
import {ScrollView, StyleSheet, View, Image} from "react-native";
import LikedFoods from "./LikedFoods";
import colors from "../../../../settings/colors";
import NextUpBlock from "../../NextUpBlock.js"

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food);

const SearchPage = withRouteParams(props => (
    <SafeAreaView style={{flex: 1}}>
        <Title style={{padding: 20, fontSize: 24, textAlign: 'center'}}>
            {props.title}
        </Title>
        <FoodBlockScroll
            onPress={(URL) => {
                props.navigation.navigate('Food', {URL})
            }}
            blocksPerCrossAxis={2} URLs={props.URLs}
            blockLength={160}/>
    </SafeAreaView>
))

const Home = connect(state => ({
        username: state.user_info.username,
        liked_foods: Object.keys(state.ratings).filter(URL => state.ratings[URL] === 1).slice(0, 3),
        saved_recipes: Object.keys(state.planned_foods),
    })
)(props => {
    const scrollLength = 150;
    const scrollProps = {
        scrollLength,
        blockLength: 130,
        onPress: URL => {
            props.navigation.navigate('Food', {URL})
        },
        horizontal: true,
    };


    //get the liked foods
    const [likedFoodNames, updateLikedFoodNames] = useState([]);

    useEffect(() => {
        async function effect() {
            const foodNames = []
            for (const URL of props.liked_foods) {
                const name = (await getRecipe(URL)).name
                foodNames.push(name)
            }
            updateLikedFoodNames(foodNames);
        }

        effect();
    }, [props.liked_foods])

    const recommendedFoods = likedFoodNames
        .map(name => (
            <React.Fragment key={name}>
                <View style={styles.section}>
                        <Text style={styles.headline}>
                            Because you liked
                        </Text>
                        <Text style={styles.subheading}>
                            Similar to "{name}"
                        </Text>
                        <RecommendedFoods foodName={name} {...scrollProps}/>
                </View>
            </React.Fragment>
        ));

    return (
        <SafeAreaView style={{flex: 1}}>

            <ScrollView style={styles.scrollview}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
                    <Title style={{fontSize: 24}}>
                        What's cooking,{"\n"}
                        good looking?
                    </Title>
                    <View>
                        <FAB
                        style={styles.userButton}
                        icon='account'
                        onPress={() => props.navigation.navigate('UserPage')}/>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headline}>
                        My lists
                    </Text>
                    <Text style={styles.subheading}>
                        Collections curated, by you
                    </Text>
                </View>

                <View style={styles.section, {padding: 20}}>
                    <Text style={styles.headline}>
                        Next up
                    </Text>
                    <Text style={styles.subheading}>
                        Your next foodblock
                    </Text>
                    <Card style={styles.nextUpBlock}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../../../assets/curry.jpg')}
                            style={{width: 150, height: 150, borderRadius: 20, resizeMode: 'cover'}}/>
                            <Card.Content>
                                <View style={{flexDirection: 'row', padding: 10}}>
                                    <Text style={{color: 'white', fontSize: 18, padding: 18}}>Curry</Text>
                                    <View>
                                        <FAB icon='calendar' style={styles.calendarButton}></FAB>
                                    </View>
                                </View>
                            </Card.Content>

                        </View>
                    </Card>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headline}>
                        Recommended
                    </Text>
                    <Text style={styles.subheading}>
                        Based on your searches
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headline}>
                        Recently searched
                    </Text>
                    <Text style={styles.subheading}>
                        Foods on your radar
                    </Text>
                    <RecentSearches onSearchPress={(title, URLs) => {
                    props.navigation.navigate('SearchPage', {URLs, title})
                }}{...scrollProps}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headline}>
                        Liked foods
                    </Text>
                    <Text style={styles.subheading}>
                        {props.username}'s badge of approval ;)
                    </Text>
                    <LikedFoods {...scrollProps}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headline}>
                        Recently viewed
                    </Text>
                    <Text style={styles.subheading}>
                        Not just for looking. Make them now!
                    </Text>
                    <RecentFoods {...scrollProps}/>
                </View>

                {recommendedFoods}

            </ScrollView>
        </SafeAreaView>
    )
});

export default headlessNavigator([
    {name: 'Home', component: Home, mainPage: true},
    {name: 'Food', component: FoodWithProps},
    {name: 'SearchPage', component: SearchPage},
    {name: 'UserPage', component: UserPage}
])

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: 'white',
        paddingVertical: 20
    },
    userButton: {
        backgroundColor: colors.foodblocksRed,
        shadowColor: colors.foodblocksRed,
        shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.8, shadowRadius: 6,
        elevation: 5,
    },
    calendarButton: {
        backgroundColor: 'white',
        color: '#A8D600',
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.8, shadowRadius: 6,
        elevation: 5,
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 14,
        color: colors.darkGrey,
        textAlign: 'center',
        paddingBottom: 10,
    },
    section: {
        paddingVertical: 16,
    },
    nextUpBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A8D600',
        elevation: 5,
        borderRadius: 8,
        shadowColor: '#A8D600',
        borderRadius: 20,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 12
    },
})
