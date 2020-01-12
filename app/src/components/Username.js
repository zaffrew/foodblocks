import React from 'react'

import styles from '../../settings/styles'
import {View} from "react-native";

import {TextInput, Title, withTheme} from 'react-native-paper'
import withRouteParams from "./withRouteParams";
import {connect} from 'react-redux'


export default connect(null, {
    updateUsername: (username) => ({
        type: 'USERNAME',
        username
    }),
})(withRouteParams(withTheme(class Username extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: ''}
    }

    onChangeText(text) {
        this.setState({
            username: text
        })
    }

    async onSubmit() {
        this.props.updateUsername(this.state.username)
        this.props.onSubmit();
    }

    render() {
        const oldColors = this.props.theme.colors;

        const theme = {
            colors: {
                primary: oldColors.background,
                background: oldColors.primary,
                text: oldColors.background,
                placeholder: oldColors.background,
            }
        };

        return (
            <View style={[styles.centeredContainer, {backgroundColor: theme.colors.background}]}>
                <Title theme={theme}>
                    What is your name?
                </Title>
                <View style={{margin: 20, flexDirection: 'row'}}>
                    <TextInput
                        style={{flex: 0.5}}
                        theme={theme}
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.username}
                        placeholder="Name"/>
                </View>
            </View>
        );
    }
})));
