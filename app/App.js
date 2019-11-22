import React from 'react';
import {SafeAreaView, View} from 'react-native';

import styles from './settings/styles.js';
import * as Font from 'expo-font';
import AppNavigator from "./src/components/AppNavigator";
import colors from "./settings/colors";

const username = "Vedant";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: username,
            screen: "splash",
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        });
        this.setState({fontLoaded: true});
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <View style={[styles.container, {backgroundColor: colors.foodblocksRed}]}>
                    <SafeAreaView style={[styles.container]}>
                        <AppNavigator/>
                    </SafeAreaView>
                </View>

            );
        }
        return null;
    }
}
