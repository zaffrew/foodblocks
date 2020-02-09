import Home from "./mainTabs/Home";
import Food from "./Food";

import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import withRouteParams from "./withRouteParams";

const HomeStack = createStackNavigator();
const FoodWithProps = withRouteParams(Food)

export default class HomeNavigator extends React.Component {

    render() {
        return (
            <HomeStack.Navigator headerMode={"none"} initialRouteName="Home">
                <HomeStack.Screen name="Home" component={Home}/>
                <HomeStack.Screen name="Food" component={FoodWithProps}/>
            </HomeStack.Navigator>
        )
    }
}
