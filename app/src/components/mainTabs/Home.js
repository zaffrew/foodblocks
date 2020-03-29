import React from "react";
import {connect} from 'react-redux'
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import FoodBlockScroll from "../FoodBlockScroll";
import {SafeAreaView} from "react-native-safe-area-context";
import {Headline, Text, Title} from "react-native-paper";
import {ScrollView, View} from "react-native";
import filterUnique from "../../utils/filterUnique";
import headlessNavigator from "../../utils/headlessNavigator";

const testRecipes = [
    'https://www.allrecipes.com/recipe/8652/garlic-chicken/',
    'https://www.allrecipes.com/recipe/217962/jans-pretzel-dogs/',
    'https://www.delish.com/cooking/recipe-ideas/a28143935/taco-bloody-marys-recipe/',
    'https://www.allrecipes.com/recipe/14169/mexican-bean-salad/',
];

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food);

//TODO: the home page updates before the food navigated to

//TODO: i cant navigate while things are loading

const Home = connect((state) => ({
    username: state.user_info.username,
    food_history: filterUnique(state.user_info.food_history.map(({URL}) => URL))
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
                    {this.props.food_history.length > 0 ?
                        <FoodBlockScroll {...scrollProps} URLs={this.props.food_history}/>
                        :
                        <View style={{alignItems: 'center', justifyContent: 'center'}} height={scrollLength}>
                            <Text>
                                View some foods to see them appear!
                            </Text>
                        </View>
                    }
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
});

export default props => headlessNavigator([
    {name: 'Home', component: Home, mainPage: true},
    {name: 'Food', component: FoodWithProps}
])
