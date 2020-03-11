import React from 'react'

import styles from '../../settings/styles'
import {View} from "react-native";

import {Button, Dialog, Paragraph, Portal, TextInput, Title, withTheme} from 'react-native-paper'
import withProps from "../utils/withProps";
import invertTheme from "../utils/invertTheme";

//TODO: remove all uses

export default withProps(withTheme(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {popup: false, value: ''}
    }

    onChangeText(text) {
        this.setState({
            value: text
        })
    }

    showDialog = () => this.setState({popup: true});
    hideDialog = () => this.setState({popup: false});

    async onSubmit() {
        if (this.props.valid(this.state.value)) {
            this.props.updateValue(this.state.value);
            this.props.onSubmit();
        } else {
            this.showDialog()
        }
    }

    render() {
        const theme = invertTheme(this.props.theme)

        return (
            <View style={[styles.centeredContainer, {backgroundColor: theme.colors.background}]}>
                <View style={[styles.centeredContainer, {backgroundColor: theme.colors.background}]}>
                    <Title theme={theme}>
                        {this.props.question}
                    </Title>
                    <View style={{margin: 20, flexDirection: 'row'}}>
                        <TextInput
                            {...this.props.textInputProps}
                            style={{flex: 0.9}}
                            theme={theme}
                            onSubmitEditing={() => this.onSubmit()}
                            onChangeText={text => this.onChangeText(text)}
                            value={this.state.value}
                            placeholder={this.props.placeholder}/>
                    </View>
                </View>
                <Portal>
                    <Dialog
                        visible={this.state.popup}
                        onDismiss={this.hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{this.props.invalidMessage}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this.hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}), {invalidMessage: 'Invalid Input', valid: () => true});
