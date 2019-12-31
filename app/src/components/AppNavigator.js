import MainPage from "./MainPage";
import Splash from "./Splash";
import Login from "./Login";

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationNativeContainer} from '@react-navigation/native';
import React from "react";


const Stack = createStackNavigator();

export default class AppNavigator extends React.Component {

    render() {
        return (
            <NavigationNativeContainer>
                <Stack.Navigator headerMode={"none"} initialRouteName="Splash">
                    <Stack.Screen name="MainPage" component={MainPage}/>
                    <Stack.Screen name="Splash" component={Splash}/>
                    <Stack.Screen name="Login" component={Login}/>
                </Stack.Navigator>
            </NavigationNativeContainer>
        )
    }

}
