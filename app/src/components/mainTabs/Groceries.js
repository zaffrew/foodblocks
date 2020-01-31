import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { TextInput } from 'react-native-paper';
import colors from '../../../settings/colors'
import SafeView from '../SafeView'

import styles from "../../../settings/styles"

export default class Groceries extends React.Component {

    state = {
        text: ''
      };

    render() {
        return (
            <SafeView style={[styles.container, {backgroundColor: colors.foodblocksRed}]}>
                <TextInput
                    mode='outlined'
                    placeholder='Add item'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                />
            </SafeView>
        );
    }
}
