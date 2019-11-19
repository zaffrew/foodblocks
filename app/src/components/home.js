import React from 'react'
import {Text, View, ScrollView} from "react-native";
import styles from "./styles";

import SidewaysScroll from "./SidewaysScroll";
import DeadSpaceStatusBar from "./deadSpaceStatusBar";
import Tabs from "./Tabs";

const username = "Vedant";

export default class Home extends React.Component {

    state = {
        username: username
    }

    render() {
        return (
            <View style={styles.container}>
                <DeadSpaceStatusBar/>
                <Text style={styles.greeting}>Hello {this.state.username}!</Text>
                <ScrollView style={styles.container}>
                    <SidewaysScroll title={"Taste Breakers"}/>
                    <SidewaysScroll title={"Popular Near You"}/>
                    <SidewaysScroll title={"Top Ten This Week"}/>
                    <SidewaysScroll title={"Recent Meals"}/>
                    <SidewaysScroll title={"Pantry to Plate"}/>
                </ScrollView>
                <Tabs/>
            </View>
        );
    }
}
