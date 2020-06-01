import {View} from "react-native";
import styles from "../../../settings/styles";
import {IconButton, Title, withTheme} from "react-native-paper";
import invertTheme from "../../utils/invertTheme";
import Filters from "../mainTabs/Search/Filters";
import React from 'react'

function Restrictions(props) {
    const theme = invertTheme(props.theme);

    return (
        <View style={[styles.centeredContainer, {backgroundColor: props.theme.colors.primary}]}>
            <Title theme={theme} style={{padding: 30}}>
                Please select any dietary restrictions or preferences
            </Title>
            <Filters/>
            <IconButton
                icon="arrow-right-bold-circle"
                size={60}
                onPress={props.onSubmit}
            />
        </View>
    );
}

export default withTheme(Restrictions)
