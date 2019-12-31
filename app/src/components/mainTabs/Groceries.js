import React from 'react'
import {Text, View} from 'react-native'

import styles from "../../../settings/styles"

export default class Groceries extends React.Component {
    render() {
        return (
            <View style={styles.centeredContainer}>
                <Text>Groceries</Text>
            </View>
        );
    }
}
