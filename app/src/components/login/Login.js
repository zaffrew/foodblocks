import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Username from "./Username";

import withProps from '../../utils/withProps'
import Email from "./Email";
import Restrictions from "./Restrictions";

const Stack = createStackNavigator();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.Username = withProps(Username, {
            onSubmit: () => {
                this.props.navigation.navigate('Email')
            }
        });

        this.Email = withProps(Email, {
            onSubmit: () => {
                this.props.navigation.navigate('Restrictions')
            }
        })

        this.Restrictions = withProps(Restrictions, {
            onSubmit: () => {
                this.props.navigation.navigate('MainPage')
            }
        })
    }

    render() {
        return (
            <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Username">
                <Stack.Screen name="Username" component={this.Username}/>
                <Stack.Screen name="Email" component={this.Email}/>
                <Stack.Screen name="Restrictions" component={this.Restrictions}/>
            </Stack.Navigator>
        );
    }
}
