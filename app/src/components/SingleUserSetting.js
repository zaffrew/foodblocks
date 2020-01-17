import React from 'react'

import styles from '../../settings/styles'
import {View} from "react-native";

import {TextInput, Title, withTheme} from 'react-native-paper'

export default withTheme(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    onChangeText(text) {
        this.setState({
            value: text
        })
    }

    async onSubmit() {
        this.props.updateValue(this.state.value);
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
                    {this.props.question}
                </Title>
                <View style={{margin: 20, flexDirection: 'row'}}>
                    <TextInput
                        style={{flex: 0.5}}
                        theme={theme}
                        onSubmitEditing={() => this.onSubmit()}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.value}
                        placeholder={this.props.placeholder}/>
                </View>
            </View>
        );
    }
});
