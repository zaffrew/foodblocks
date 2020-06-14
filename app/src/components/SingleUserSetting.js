import React, {useState} from 'react'
import {View} from "react-native";

import {Button, Dialog, Paragraph, Portal, TextInput, Title} from 'react-native-paper'
import withProps from "../utils/withProps";

function SingleUserSetting(props) {
    const [popup, setPopup] = useState(false)
    const [value, setValue] = useState('')

    async function onSubmit() {
        if (props.valid(value)) {
            props.updateValue(value);
            props.onSubmit();
        } else {
            setPopup(true);
        }
    }

    return (
        <View style={{alignItems: 'center'}}>
            <Title theme={props.theme}>
                {props.question}
            </Title>
            <View style={{margin: 20, flexDirection: 'row'}}>
                <TextInput
                    {...props.textInputProps}
                    theme={props.theme}
                    style={{flex: 0.9}}
                    onSubmitEditing={onSubmit}
                    onChangeText={text => setValue(text)}
                    value={value}
                    placeholder={props.placeholder}/>
            </View>
            <Portal>
                <Dialog
                    visible={popup}
                    onDismiss={() => setPopup(false)}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{props.invalidMessage}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setPopup(false)}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default withProps(SingleUserSetting, {invalidMessage: 'Invalid Input', valid: value => true});
