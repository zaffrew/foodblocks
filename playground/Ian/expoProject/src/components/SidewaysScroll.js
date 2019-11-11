import React from 'react'
import {ScrollView, Text, View} from "react-native";

import FoodBlock from "./FoodBlock";

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
                <Text style = {styles.subtitle}>{this.state.title}</Text>
                <ScrollView contentContainerStyle={{height: 200}} horizontal={true} alwaysBounceHorizontal={true}>
                    <FoodBlock image={curry} text='curry'/>
                    <FoodBlock image={applePie} text='apple pie'/>
                    <FoodBlock image={bananaBread} text='banana bread'/>
                    <FoodBlock image={beans} text='beans'/>
                    <FoodBlock image={pasta} text='pasta'/>
                    <FoodBlock image={sushi} text='sushi'/>
                </ScrollView>
            </View>
        );
    }
}
