import React from 'react'
import {ScrollView, Text, View} from "react-native";

import InteractiveTextImage from "./InteractiveTextImage";

import beans from "../../assets/beans.png";
import pasta from "../../assets/pasta.jpg";
import sushi from "../../assets/sushi.png";
import applePie from "../../assets/applePie.jpeg";
import bananaBread from "../../assets/bananaBread.jpeg";
import curry from "../../assets/curry.jpg";

export default class SidewaysScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.subtitle}>{this.state.title}</Text>
                <ScrollView contentContainerStyle={{height: 200}} horizontal={true} alwaysBounceHorizontal={true}>
                    <InteractiveTextImage image={curry} text='Curry'/>
                    <InteractiveTextImage image={applePie} text='Apple Pie'/>
                    <InteractiveTextImage image={bananaBread} text='Banana Bread'/>
                    <InteractiveTextImage image={beans} text='Beans'/>
                    <InteractiveTextImage image={pasta} text='Pasta'/>
                    <InteractiveTextImage image={sushi} text='Sushi'/>
                </ScrollView>
            </View>
        );
    }
}
