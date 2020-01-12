import React from "react";
import {AsyncStorage, ScrollView} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";
import SafeView from '../SafeView'
import {Title} from "react-native-paper";

export default connect((state) => ({username: state.username}))(Home);

class Home extends React.Component {
    openFood = () => {
        console.log("Entered function");
        this.props.navigation.navigate('Food');
    }


    render() {
        return (
            <SafeView style={styles.container}>
                <Title style={{padding: 5, fontSize: 30}}>Hello {this.state.username}!</Title>
                <ScrollView style={styles.container}>
                    <SidewaysScroll title={"Taste Breakers"} onTap={this.openFood}/>
                    <SidewaysScroll title={"Popular Near You"} onTap={this.openFood}/>
                    <SidewaysScroll title={"Top Ten This Week"} onTap={this.openFood}/>
                    <SidewaysScroll title={"Recent Meals"} onTap={this.openFood}/>
                    <SidewaysScroll title={"Pantry to Plate"} onTap={this.openFood}/>
                </ScrollView>
            </SafeView>
        );
    }
}
