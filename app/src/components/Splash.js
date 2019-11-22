import React from 'react'
import styles from '../../settings/styles'

import {Text, View} from 'react-native'
import colors from "../../settings/colors";
import settings from "../../settings/appSettings";

const splashTransitionTime = settings.splashTransitionTime;

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }

    render() {
        return (
            <View style={[styles.centeredContainer, {backgroundColor: colors.foodblocksRed}]}>
                <Text style={styles.foodblocksTitle}>foodblocks</Text>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('MainPage')
        }, splashTransitionTime);
    }
}
