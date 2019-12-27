import React from 'react'

import {Platform, SafeAreaView} from "react-native";

import Constants from 'expo-constants'

export default function (props) {

    let paddingTop = 0;

    if (props.style && props.style.paddingTop) {
        paddingTop += props.style.paddingTop
    }

    if (Platform.OS === 'android') {
        paddingTop += Constants.statusBarHeight
    }


    return (
        <SafeAreaView {...props} style={[props.style, {paddingTop: paddingTop}]}/>
    );
}
