import React from 'react'
import {View, ScrollView} from "react-native";
import styles from "./styles";
import { Text } from 'react-native';
import { Button } from 'react-native';



import SidewaysScroll from "./SidewaysScroll";
import DeadSpaceStatusBar from "./deadSpaceStatusBar";
import Tabs from "./Tabs";

export default class Home extends React.Component {

    render() {
        return (
            <View style={styles.centeredContainer}>
                <View style={styles.container, styles.homeColour}>
                    <DeadSpaceStatusBar/>
                        <Text style={{fontWeight: 'bold'}}>
                            <Text style={{color: 'red'}}>
                                Foodblocks
                            </Text>
                        </Text>
                        <ScrollView style={styles.container}>
                            <SidewaysScroll title={"Recent Meals"}/>
                            <SidewaysScroll title={"Taste Breakers"}/>
                            <SidewaysScroll title={"Popular Near You"}/>
                            <SidewaysScroll title={"Top Ten This Week"}/>
                            <SidewaysScroll title={"Pantry to Plate"}/>
                            <SidewaysScroll title={"Recommedations For You"}/>
                        </ScrollView>
                        <Tabs/>
                </View>
            </View>
        );
    }
}
