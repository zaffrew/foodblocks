import {withTheme} from "react-native-paper";
import React from "react";
import {View} from 'react-native';
import SingleUserSetting from './SingleUserSetting'
import invertTheme from "../utils/invertTheme";

export default withTheme(props => {
    const theme = invertTheme(props.theme);
    return (
        <View
            style={{flex: 1, justifyContent: 'center', backgroundColor: theme.colors.background}}>
            <SingleUserSetting {...props} theme={theme}/>
        </View>
    )
})
