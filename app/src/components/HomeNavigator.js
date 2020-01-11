import Home from "./mainTabs/Home";
import Food from "./Food";

import {createStackNavigator} from '@react-navigation/stack';
import React from "react";


const HomeStack = createStackNavigator();

export default class AppNavigator extends React.Component {

    render() {
        return (
                <HomeStack.Navigator headerMode={"none"} initialRouteName="Home">
                    <HomeStack.Screen name="Home" component={Home}/>
                    <HomeStack.Screen name="Food" component={Food}/>
                </HomeStack.Navigator>

        )
    }

}
