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
import { SourceType } from "expo-calendar";

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
        planned_foods: state.planned_foods,
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

    //All planned events with data
    console.log(props.planned_foods)

    //planned URLs
    const plannedURLs = Object.keys(props.planned_foods)
    console.log(plannedURLs)

    function convertDate(date) {
        // take date object as input
        let dateString = '';
        let current = new Date();

        let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        let am_or_pm = date.getHours() > 12 ? 'PM' : 'AM';

        if (current.getFullYear() === date.getFullYear() &&
            current.getMonth() === date.getMonth()) {
                if (current.getDate() === date.getDate()) {
                    dateString = 'TODAY AT ' + hours + ' ' + am_or_pm;
                } else if (current.getDate() === date.getDate() - 1) {
                    dateString = 'TOMORROW AT ' + hours + ' ' + am_or_pm;
                } else if (date.getDate() - current.getDate() < 8) {
                    dateString = days[date.getDay()] + ' at ' + hours + ' ' + am_or_pm; 
                } else {
                    dateString = months[date.getMonth()] + ' ' + date.getDate() + ' at ' + hours + ' ' + am_or_pm;
                }
        }

        return dateString;
    }

    function compare(a, b) {
        const dateA = new Date(a[1].eventDate);
        const dateB = new Date(b[1].eventDate);
        if (dateA <= dateB) {
            return -1;
        } else {
            return 1;
        }
    }

    let next_up = '';
    let saved_food_name = '';
    let saved_food_time = '';
    let saved_food_url = '';

    //most recent planned food
    if (plannedURLs.length > 0) {

        let planned = Object.entries(props.planned_foods);
        console.log('planned', planned)
        planned.sort(compare)

        console.log('planned sorted', planned);
        console.log('-----');

        let minURL = plannedURLs[0]
        let minDate = props.planned_foods[plannedURLs[0]];
        let current = new Date();

        for (const [key, value] of planned) {
            const date = new Date(value.eventDate);
            if (date >= current) {
                minDate = date;
                minURL = key;
                break;
            }
        }

        // for (const [key, value] of Object.entries(props.planned_foods)) {
        //     const date = new Date(value.eventDate);
        //     if (date < minDate && date >= current) {
        //         minDate = date;
        //         minURL = key;
        //     }
        // }

        console.log('min', minURL)

        //recipe data of min URL
        getRecipe(minURL).then(recipe => (saved_food_name = recipe['name']));
        console.log(saved_food_name);
        saved_food_time = convertDate(minDate);
        saved_food_url = minURL;
    }

    //get the liked foods and saved foods
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

    const NextUpBlock = (
        <View style={styles.section}>
            <Text style={styles.headline}>
                Next up
            </Text>
            <Text style={styles.subheading}>
                Your next foodblock
            </Text>
            <View style={styles.nextUpBlock}>
                <View style={styles.nextUpImage}>
                    <Image source={require('../../../../assets/curry.jpg')} style={styles.nextUpImage}/>
                </View>

                <View style={styles.nextUpContents}>
                    <Text numberOfLines={3} style={styles.nextUpTitle}>
                            {saved_food_name}
                    </Text>
                    <View>
                        <Text style={styles.nextUpSub}>
                            {saved_food_time}
                        </Text>
                    </View>
                </View>

                <View style={{padding: 10, alignSelf: 'flex-start'}}>
                    <FAB icon='arrow-right' style={styles.openRecipeButton} onPress={openRecipe(saved_food_url)}></FAB>
                </View>
            </View>
        </View>
    )

    async function openRecipe(URL) {
        props.navigation.navigate('Food', URL)
    };

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

                {NextUpBlock}

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
    openRecipeButton: {
        backgroundColor: 'white',
        color: '#A8D600',
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.8, shadowRadius: 6,
        elevation: 5,
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 10,
    },
    subheading: {
        fontSize: 14,
        color: colors.darkGrey,
        textAlign: 'center',
        paddingBottom: 16,
    },
    section: {
        paddingVertical: 16,
    },
    nextUpBlock: {
        height: 150,
        width: 350,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.foodblocksRed,
        elevation: 5,
        borderRadius: 8,
        shadowColor: colors.foodblocksRed,
        borderRadius: 20,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 12
    },
    nextUpImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: colors.darkGrey,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.8,
    },
    nextUpContents: {
        paddingVertical: 10,
        padding: 6,
        flex: 1
    },
    nextUpTitle: {
        fontSize: 18,
        color: 'white',
        padding: 6,
    },
    nextUpSub: {
        fontSize: 14,
        color: 'white',
        padding: 6,
    }
})
