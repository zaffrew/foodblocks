import MainPage from "./MainPage";
import Splash from "./Splash";
import Username from "./Username";

import {createStackNavigator} from '@react-navigation/stack';
import React from "react";


const Stack = createStackNavigator();

export default class AppNavigator extends React.Component {

    render() {
        return (
            <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Splash">
                <Stack.Screen name="MainPage" component={MainPage}/>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Login" component={Username}/>
            </Stack.Navigator>
        )
    }

}
