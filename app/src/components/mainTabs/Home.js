import React from "react";
import {connect} from 'react-redux'
import {getData, search} from "../../scraper/AllRecipe"
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import FoodBlockScroll from "../FoodBlockScroll";
import {SafeAreaView} from "react-native-safe-area-context";
import {Headline, Title} from "react-native-paper";
import {ScrollView} from "react-native";

const testRecipes = [
    'https://www.allrecipes.com/recipe/8652/garlic-chicken/',
    'https://www.allrecipes.com/recipe/217962/jans-pretzel-dogs/',
    'https://www.delish.com/cooking/recipe-ideas/a28143935/taco-bloody-marys-recipe/',
    'https://www.allrecipes.com/recipe/14169/mexican-bean-salad/',
]

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food)

const Home = connect((state) => ({username: state.user_info.username}))(class extends React.Component {
    openFood = (URL) => {
        this.props.navigation.navigate('Food', {URL})
    }

    render() {
        const scrollProps = {
            scrollLength: 200,
            blockLength: 160,
            onPress: this.openFood,
            horizontal: true,
            URLs: testRecipes,
        }

        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
                        Hello {this.props.username}!
                    </Title>
                    <Headline>
                        Recommended For You
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                    <Headline>
                        Recently Viewed
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                    <Headline>
                        Next up
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                    <Headline>
                        Popular in your area
                    </Headline>
                    <FoodBlockScroll {...scrollProps}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
})

export default class HomeNavigator extends React.Component {
    render() {
        return (
            <HomeStack.Navigator screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}
                                 initialRouteName="Home">
                <HomeStack.Screen options={{headerShown: false}} name="Home" component={Home}/>
                <HomeStack.Screen name="Food" component={FoodWithProps}/>
            </HomeStack.Navigator>
        )
    }
}
