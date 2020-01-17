import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Username from "./Username";

import withProps from './withProps'

const Stack = createStackNavigator();

export default function (props) {
    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Username">
            <Stack.Screen name="Username" component={withProps(Username, {
                onSubmit: () => {
                    props.navigation.navigate('MainPage')
                }
            })}/>
        </Stack.Navigator>
    );
}
