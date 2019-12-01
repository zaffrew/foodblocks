import React from 'react';
import {Platform, SafeAreaView} from 'react-native';

import Constants from 'expo-constants'

import styles from './settings/styles.js';
import * as Font from 'expo-font';
import AppNavigator from "./src/components/AppNavigator";
import colors from "./settings/colors";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
    }

    async loadSplashFont() {
        await Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        });
        this.setState({fontLoaded: true});
    }

    componentDidMount() {
        this.loadSplashFont()
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                //The safe area view only works for ios so we add the padding for android devices
                <SafeAreaView
                    style={[styles.container, {
                        backgroundColor: colors.foodblocksRed,
                        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
                    }]}>
                    <AppNavigator/>
                </SafeAreaView>

            );
        }
        return null;
    }
}
