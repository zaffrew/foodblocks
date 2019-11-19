import React from 'react'
import Constants from 'expo-constants'

import {View} from 'react-native'

export default function DeadSpaceStatusBar() {

    return (
        <View style={{height: Constants.statusBarHeight, backgroundColor: 'powderblue'}} />
    );
}
