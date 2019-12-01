import React from "react";
import {ScrollView, Text, View, AsyncStorage} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            username:''
        }
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('username')
        this.setState({username})
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: 'white'}]}>
                <Text style={styles.greeting}>Hello {this.state.username}!</Text>
                <ScrollView style={styles.container}>
                    <SidewaysScroll title={"Taste Breakers"}/>
                    <SidewaysScroll title={"Popular Near You"}/>
                    <SidewaysScroll title={"Top Ten This Week"}/>
                    <SidewaysScroll title={"Recent Meals"}/>
                    <SidewaysScroll title={"Pantry to Plate"}/>
                </ScrollView>
            </View>
        );
    }
}
