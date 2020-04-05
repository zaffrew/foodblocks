import {View} from "react-native";
import styles from "../../../settings/styles";
import {IconButton, Title, withTheme} from "react-native-paper";
import invertTheme from "../../utils/invertTheme";
import Filters from "../mainTabs/Search/Filters";
import React from 'react'


const filterNames = ['Vegan', 'Halal', 'Gluten-free', 'Keto', 'Dairy-free'];

class Restrictions extends React.Component {
    render() {
        const theme = invertTheme(this.props.theme);

        return (
            <View style={[styles.centeredContainer, {backgroundColor: this.props.theme.colors.primary}]}>
                <Title theme={theme} style={{padding: 30}}>
                    Please select any dietary restrictions or preferences
                </Title>
                <Filters/>
                <IconButton
                    icon="arrow-right-bold-circle"
                    size={60}
                    onPress={this.props.onSubmit}
                />
            </View>
        );
    }
}

export default withTheme(Restrictions)
