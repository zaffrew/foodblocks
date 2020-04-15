import React from "react";
import {connect} from 'react-redux'
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../../utils/withRouteParams";
import Food from "../../Food";
import FoodBlockScroll from "../../FoodBlockScroll";
import {Headline, Title} from "react-native-paper";
import {ScrollView} from "react-native";
import SafeView from "../../SafeView";
import headlessNavigator from "../../../utils/headlessNavigator";
import RecentFoods from "./RecentFoods";
import RecentSearches from "./RecentSearches";

const testRecipes = [
    'https://www.allrecipes.com/recipe/8652/garlic-chicken/',
    'https://www.allrecipes.com/recipe/217962/jans-pretzel-dogs/',
    'https://www.delish.com/cooking/recipe-ideas/a28143935/taco-bloody-marys-recipe/',
    'https://www.allrecipes.com/recipe/14169/mexican-bean-salad/',
];

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food);

const SearchPage = withRouteParams(props => (
    <SafeView style={{flex: 1}} bottom={false}>
        <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
            Search: {props.title}
        </Title>
        <FoodBlockScroll
            onPress={(URL) => {
                props.navigation.navigate('Food', {URL})
            }}
            blocksPerCrossAxis={2} URLs={props.URLs}
            blockLength={160}/>
    </SafeView>
))

const Home = connect((state) => ({
    username: state.user_info.username,
}))
(class extends React.Component {
    openFood = (URL) => {
        this.props.navigation.navigate('Food', {URL})
    };

    render() {
        const scrollLength = 200;
        const scrollProps = {
            scrollLength,
            blockLength: 160,
            onPress: this.openFood,
            horizontal: true,
            URLs: testRecipes,
        };

        return (
            <SafeView bottom={false} style={{flex: 1}}>
                <ScrollView>
                    <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
                        Hello {this.props.username}!
                    </Title>
                    <Headline>
                        Recently Searched
                    </Headline>
                    <RecentSearches onSearchPress={(title, URLs) => {
                        this.props.navigation.navigate('SearchPage', {URLs, title})
                    }}{...scrollProps}/>
                    <Headline>
                        Recently Viewed
                    </Headline>
                    <RecentFoods {...scrollProps}/>
                    <Headline>
                        Next up
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                    <Headline>
                        Popular in your area
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                </ScrollView>
            </SafeView>
        )
    }
});


export default headlessNavigator([
    {name: 'Home', component: Home, mainPage: true},
    {name: 'Food', component: FoodWithProps},
    {name: 'SearchPage', component: SearchPage}
])
