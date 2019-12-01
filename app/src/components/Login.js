import React from 'react'

import styles from '../../settings/styles'
import {View, Text} from "react-native";

import {Input} from 'react-native-elements'

import colors from '../../settings/colors'

import {AsyncStorage} from 'react-native';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {username: ''}
    }

    onChangeText(text) {
        this.setState({
            username: text
        })
    }

    async onSubmit() {
        AsyncStorage.setItem('username', this.state.username);
        this.props.navigation.navigate("MainPage")
    }

    render() {
        return (
            <View style={[styles.centeredContainer]}>
                <Text style={styles.heading}>
                    What is your name?
                </Text>
                <View style={{margin: 20, flexDirection: 'row'}}>
                    <Input
                        onEndEditing={() => this.onSubmit()}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.username}
                        placeholderTextColor={'white'}
                        inputStyle={[styles.foodName, {color: 'white'}]}
                        containerStyle={{margin: 0, backgroundColor: colors.darkerRed, flex: 0.5}}
                        placeholder="Name"/>
                </View>
            </View>
        );
    }
}
