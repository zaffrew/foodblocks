import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import withProps from '../../utils/withProps'
import UsernameClass from "./Username";
import EmailClass from "./Email";
import RestrictionsClass from "./Restrictions";

const Stack = createStackNavigator();

export default function Login(props) {
    const Username = withProps(UsernameClass, {
        onSubmit: () => {
            props.navigation.navigate('Email')
        }
    });

    const Email = withProps(EmailClass, {
        onSubmit: () => {
            props.navigation.navigate('Restrictions')
        }
    });

    const Restrictions = withProps(RestrictionsClass, {
        onSubmit: () => {
            props.navigation.navigate('MainPage')
        }
    })

    return (
        <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Username">
            <Stack.Screen name="Username" component={Username}/>
            <Stack.Screen name="Email" component={Email}/>
            <Stack.Screen name="Restrictions" component={Restrictions}/>
        </Stack.Navigator>
    );
}
