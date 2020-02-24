import React from 'react'
import {View} from 'react-native'
import colors from '../../../settings/colors'
import SafeView from "../SafeView";
import {Headline, TextInput} from "react-native-paper";
import FoodBlockScroll from "./FoodBlockScroll";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../withRouteParams";
import Food from "../Food";
import {STORES} from "../../state/State";


const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

class Meals extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <SafeView style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 20}, {paddingHorizontal: 10}]}>
                        Saved Meals
                    </Headline>
                </SafeView>
                <FoodBlockScroll onPress={(URL) => {
                    this.props.navigation.navigate('Food', {URL})
                }}
                                 columns={2} URLs={this.props.recipes}/>
            </View>
        );
    }
}

const ConnectedMeals = connect((state) => ({recipes: state[STORES.SAVED_RECIPES]}))(Meals)

export default class MealNavigator extends React.Component {
    render() {
        return (
            <Navigator.Navigator screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}
                                 initialRouteName="Meals">
                <Navigator.Screen options={{headerShown: false}} name="Meals" component={ConnectedMeals}/>
                <Navigator.Screen name="Food" component={FoodWithParams}/>
            </Navigator.Navigator>
        )
    }
}
