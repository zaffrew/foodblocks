import React from "react";
import {ScrollView, Text, View} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Hello {this.state.username}!</Text>
                <ScrollView style={styles.container}>
                    <SidewaysScroll title={"Taste Breakers"}/>
                    <SidewaysScroll title={"Popular Near You"}/>
                    <SidewaysScroll title={"Top Ten This Week"}/>
                    <SidewaysScroll title={"Recent Meals"}/>
                    <SidewaysScroll title={"Pantry to Plate"}/>
                </ScrollView>
                {/*<Tabs/>*/}
            </View>
        );
    }
}
