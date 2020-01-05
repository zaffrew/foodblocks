import React from "react";
import {AsyncStorage, ScrollView} from "react-native";
import styles from "../../../settings/styles";
import SidewaysScroll from "../SidewaysScroll";
import SafeView from '../SafeView'
import {Title} from "react-native-paper";

import {connect} from 'react-redux'


export default connect((state) => ({username: state.username}))((props) => (
    <SafeView style={styles.container}>
        <Title style={{padding: 5, fontSize: 30}}>Hello {props.username}!</Title>
        <ScrollView style={styles.container}>
            <SidewaysScroll title={"Taste Breakers"}/>
            <SidewaysScroll title={"Popular Near You"}/>
            <SidewaysScroll title={"Top Ten This Week"}/>
            <SidewaysScroll title={"Recent Meals"}/>
            <SidewaysScroll title={"Pantry to Plate"}/>
        </ScrollView>
    </SafeView>
));
