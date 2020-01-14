import React from 'react'
import Constants from 'expo-constants'
import styles from "./styles";

import {View} from 'react-native'

export default function DeadSpaceStatusBar() {

    return (
        <View style={{height: Constants.statusBarHeight, backgroundColor: 'white'}}/>
    );
}
