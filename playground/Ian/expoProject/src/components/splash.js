import React from 'react'
import styles from './styles'

import {View, Text} from 'react-native'
import DeadSpaceStatusBar from "./deadSpaceStatusBar";

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.splashColor]}>
                <DeadSpaceStatusBar/>
                <View style={styles.centeredContainer}>
                    <Text style={styles.foodblocksTitle}>foodblocks</Text>
                    <Text style={styles.greeting}>Hello {this.state.name}!</Text>
                </View>
            </View>
        );
    }
}
