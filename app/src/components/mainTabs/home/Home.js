import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../../utils/withRouteParams";
import Food from '../../Food/Food'
import FoodBlockScroll from "../../FoodBlockScroll";
import {Headline, Title} from "react-native-paper";
import headlessNavigator from "../../../utils/headlessNavigator";
import RecommendedFoods from "./ReccommendedFoods";
import {getRecipe} from '../../../scraper/Scraper'
import {SafeAreaView} from "react-native-safe-area-context";
import RecentFoods from "./RecentFoods";
import RecentSearches from "./RecentSearches";
import {ScrollView} from "react-native";

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food);

const SearchPage = withRouteParams(props => (
    <SafeAreaView style={{flex: 1}}>
        <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
            Search: {props.title}
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
    const scrollLength = 200;
    const scrollProps = {
        scrollLength,
        blockLength: 160,
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

    const reccomendedFoods = likedFoodNames
        .map(name => (
            <React.Fragment key={name}>
                <Headline>
                    Because you liked {name}
                </Headline>
                <RecommendedFoods foodName={name} {...scrollProps}/>
            </React.Fragment>
        ));

    const savedMealComponent = props.saved_recipes.length > 0 ?
        <React.Fragment>
            <Headline>
                Saved Meals
            </Headline>
            <FoodBlockScroll {...scrollProps} URLs={props.saved_recipes}/>
        </React.Fragment> : null


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
                    Hello {props.username}!
                </Title>
                {savedMealComponent}
                <Headline>
                    Recently Searched
                </Headline>
                <RecentSearches onSearchPress={(title, URLs) => {
                    props.navigation.navigate('SearchPage', {URLs, title})
                }}{...scrollProps}/>
                <Headline>
                    Recently Viewed
                </Headline>
                <RecentFoods {...scrollProps}/>
                {reccomendedFoods}
            </ScrollView>
        </SafeAreaView>
    )
});


export default headlessNavigator([
    {name: 'Home', component: Home, mainPage: true},
    {name: 'Food', component: FoodWithProps},
    {name: 'SearchPage', component: SearchPage}
])
