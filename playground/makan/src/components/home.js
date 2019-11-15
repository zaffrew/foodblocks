import React from 'react'
import {View, Text} from "react-native";
import styles from "./styles";
import FoodBlock from "./FoodBlock";

export default class Home extends React.Component {

    render() {
        return (
            <View style={styles.centeredContainer}>
                <FoodBlock/>
            </View>
        );
    }
}
