import React from 'react'
import {Text, View} from 'react-native'


import styles from "../../../settings/styles"

export default class ForYou extends React.Component {
    render() {
        return (
            <View style={[styles.centeredContainer, {backgroundColor: 'pink'}]}>
                <Text>ForYou</Text>
            </View>
        );
    }
}
