import React from 'react'
import {Text, View} from 'react-native'

import styles from "../../settings/styles"

export default class Food extends React.Component {
    render() {
        return (
            <View style={styles.centeredContainer}>
                <Text>Food</Text>
            </View>
        );
    }
}
