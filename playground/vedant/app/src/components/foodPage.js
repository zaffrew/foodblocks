import React from 'react'
import {Text, View} from "react-native";
import styles from "./styles";
import DeadSpaceStatusBar from './deadSpaceStatusBar';
import Tabs from './Tabs.js';

const foodName = "Curry";

export default class Home extends React.Component {

    state = {
        foodName: foodName
    }

    render() {
        return (
                <View style={styles.container}>
                    <DeadSpaceStatusBar/>
                    <Text style={styles.heading}>{this.state.foodName}</Text>
                    <Tabs/>
                </View>
        );
    }
}