import React, {useEffect} from 'react'
import styles from '../../settings/styles'

import {View} from 'react-native'
import settings from "../../settings/appSettings";
import {Button, Title, withTheme} from "react-native-paper";
import {connect} from "react-redux";
import invertTheme from "../utils/invertTheme";
import {ACTIONS} from "../state/State";

function SplashScreen(props) {
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setTimeout(() => {
                if (props.username) {
                    props.navigation.navigate('MainPage')
                } else {
                    props.navigation.navigate('Login')
                }
            }, settings.splashTransitionTime);
        })
        return unsubscribe;
    }, [props.username])

    const theme = invertTheme(props.theme);

    const logout = __DEV__ ?
        <Button color={'black'} onPress={props.logout}>DEV ONLY LOGOUT</Button> : null;

    return (
        <View style={[styles.centeredContainer, {backgroundColor: props.theme.colors.primary}]}>
            <Title theme={theme} style={{padding: 30, fontSize: 50}}>foodblocks</Title>
            {logout}
        </View>
    );
}

export default connect((state) => ({
        //we use the username to see if the user is logged in
        username: state.user_info.username
    }),
    {
        logout: () => ({
            type: ACTIONS.RESET,
        }),
    }
)(withTheme(SplashScreen))
