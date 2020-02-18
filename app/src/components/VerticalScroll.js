import React from 'react'
import {ScrollView, View} from "react-native";

import InteractiveTextImage from "./InteractiveTextImage";

import beans from "../../assets/beans.png";
import pasta from "../../assets/pasta.jpg";
import sushi from "../../assets/sushi.png";
import applePie from "../../assets/applePie.jpeg";
import bananaBread from "../../assets/bananaBread.jpeg";
import curry from "../../assets/curry.jpg";

export default class VerticalScroll extends React.Component {

    render() {
        return (

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <InteractiveTextImage image={curry} text='Curry' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                        <InteractiveTextImage image={applePie} text='Apple Pie' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <InteractiveTextImage image={bananaBread} text='Banana Bread' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                        <InteractiveTextImage image={beans} text='Beans' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <InteractiveTextImage image={pasta} text='Pasta' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                        <InteractiveTextImage image={sushi} text='Sushi' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <InteractiveTextImage image={bananaBread} text='Banana Bread' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                        <InteractiveTextImage image={beans} text='Beans' onTap={this.props.onTap} height={160} width={160} textSize={16}/>
                    </View>
                </ScrollView>
        );
    }
}
