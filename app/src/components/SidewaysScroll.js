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
            title: this.props.title,
            onTap: this.props.onTap
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.subtitle}>{this.state.title}</Text>
                <ScrollView contentContainerStyle={{height: 250}} horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
                    <InteractiveTextImage image={curry} text='Curry' onTap={this.state.onTap}/>
                    <InteractiveTextImage image={applePie} text='Apple Pie' onTap={this.state.onTap}/>
                    <InteractiveTextImage image={bananaBread} text='Banana Bread' onTap={this.state.onTap}/>
                    <InteractiveTextImage image={beans} text='Beans' onTap={this.state.onTap}/>
                    <InteractiveTextImage image={pasta} text='Pasta' onTap={this.state.onTap}/>
                    <InteractiveTextImage image={sushi} text='Sushi' onTap={this.state.onTap}/>
                </ScrollView>
            </View>
        );
    }
}
