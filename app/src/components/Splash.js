import React from 'react'
import styles from '../../settings/styles'

import {View} from 'react-native'
import settings from "../../settings/appSettings";
import {Button, Title, withTheme} from "react-native-paper";
import {connect} from "react-redux";
import invertTheme from "../utils/invertTheme";
import {ACTIONS} from "../state/State";

const splashTransitionTime = settings.splashTransitionTime;

export default connect(null,
    {
        logout: () => ({
            type: ACTIONS.RESET,
        }),
    }
)(withTheme(class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }

    render() {
        const theme = invertTheme(this.props.theme);

        const logout = __DEV__ ?
            <Button color={'green'} onPress={this.props.logout}>DEV ONLY LOGOUT</Button> : null;

        return (
            <View style={[styles.centeredContainer, {backgroundColor: this.props.theme.colors.primary}]}>
                <Title theme={theme} style={{padding: 30, fontSize: 50}}>foodblocks</Title>
                {logout}
            </View>
        );
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            setTimeout(() => {
                if (this.props.username) {
                    this.props.navigation.navigate('MainPage')
                } else {
                    this.props.navigation.navigate('Login')
                }
            }, splashTransitionTime);
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }
}))
