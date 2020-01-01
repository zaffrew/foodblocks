import React from "react";
import {AsyncStorage, ScrollView} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";
import SafeView from '../SafeView'
import {Title} from "react-native-paper";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('username');
        this.setState({username})
    }

    render() {
        return (
            <SafeView style={styles.container}>
                <Title style={{padding: 5, fontSize: 30}}>Hello {this.state.username}!</Title>
                <ScrollView style={styles.container}>
                    <SidewaysScroll title={"Taste Breakers"}/>
                    <SidewaysScroll title={"Popular Near You"}/>
                    <SidewaysScroll title={"Top Ten This Week"}/>
                    <SidewaysScroll title={"Recent Meals"}/>
                    <SidewaysScroll title={"Pantry to Plate"}/>
                </ScrollView>
            </SafeView>
        );
    }
}
