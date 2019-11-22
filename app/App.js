import React from 'react';
import {Platform, SafeAreaView, View} from 'react-native';

import Constants from 'expo-constants'

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
                    {/*The safe area view only works for ios so we add the padding for android devices*/}
                    <SafeAreaView
                        style={[styles.container, {paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0}]}>
                        <AppNavigator/>
                    </SafeAreaView>
                </View>

            );
        }
        return null;
    }
}
