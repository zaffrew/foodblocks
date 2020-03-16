import React from "react";
import {ScrollView} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";
import {Title} from "react-native-paper";
import {connect} from 'react-redux'
import {getData, search} from "../../scraper/AllRecipe"
import {SafeAreaView} from "react-native-safe-area-context";

//TODO: Home is still broken and needs to be overhauled with new search and new foodblock scroll component.

class Home extends React.Component {

    openFood = async function (searchTerm) {
        const data = await getData((await search(searchTerm, 1))[0]);
        this.props.navigation.navigate('Food', {data});
    }.bind(this);

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Title style={{padding: 5, fontSize: 30}}>Hello {this.props.username}!</Title>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <SidewaysScroll title={"Taste Breakers"} onTap={this.openFood} height={200} width={200}/>
                    <SidewaysScroll title={"Popular Near You"} onTap={this.openFood} height={200} width={200}/>
                    <SidewaysScroll title={"Top Ten This Week"} onTap={this.openFood} height={200} width={200}/>
                    <SidewaysScroll title={"Recent Meals"} onTap={this.openFood} height={200} width={200}/>
                    <SidewaysScroll title={"Pantry to Plate"} onTap={this.openFood} height={200} width={200}/>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default connect((state) => ({username: state.user_info.username}))(Home);
