import React from 'react'
import styles from '../../settings/styles'

import {View} from 'react-native'
import settings from "../../settings/appSettings";
import {Title, withTheme} from "react-native-paper";
import {connect} from "react-redux";

const splashTransitionTime = settings.splashTransitionTime;

export default connect((state) => ({
    email: state.email,
    username: state.username
}))(withTheme(class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }

    render() {
        const theme = {
            colors: {
                text: this.props.theme.colors.background
            }
        };

        return (
            <View style={[styles.centeredContainer, {backgroundColor: this.props.theme.colors.primary}]}>
                <Title theme={theme} style={{padding: 30, fontSize: 50}}>foodblocks</Title>
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
