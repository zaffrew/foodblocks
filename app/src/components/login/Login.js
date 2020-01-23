import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Username from "./Username";

import withProps from '../withProps'
import EmailPage from "./EmailPage";

const Stack = createStackNavigator();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.Username = withProps(Username, {
            onSubmit: () => {
                this.props.navigation.navigate('Email')
            },
            textInputProps: {
                autoCompleteType: 'name',
                textContentType: 'name',
                autoCapitalize: 'words'
            }
        })

        this.EmailPage = withProps(EmailPage, {
            onSubmit: () => {
                this.props.navigation.navigate('MainPage')
            },
            textInputProps: {
                autoCompleteType: 'email',
                keyboardType: 'email-address',
                textContentType: 'emailAddress',
                autoCapitalize: 'none'
            }
        })
    }

    render() {
        return (
            <Stack.Navigator screenOptions={{gestureEnabled: false}} headerMode={"none"} initialRouteName="Username">
                <Stack.Screen name="Username" component={this.Username}/>
                <Stack.Screen name="Email" component={this.EmailPage}/>
            </Stack.Navigator>
        );
    }
}
