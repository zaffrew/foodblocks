import MainPage from "./MainPage";
import Splash from "./Splash";

import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import Login from "./login/Login";
import FABNavigator from "./FABNavigator";


const Stack = createStackNavigator();

export default function AppNavigator(props) {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Splash">
            <Stack.Screen name="MainPage" component={FABNavigator}/>
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    )
}
