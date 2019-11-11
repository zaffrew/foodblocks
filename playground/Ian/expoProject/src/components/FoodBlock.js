import React from 'react'

import styles from './styles'
import {View, Image, Text} from 'react-native'

export default class FoodBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            text: props.text,
        }

    }

    render() {
        return (
            <View style={[styles.centeredContainer, {margin:20}]}>
                <Image style = {{width:100, height:100}} source={this.state.image}/>
                <Text style = {styles.heading}>{this.state.text}</Text>
            </View>
        );
    }
}
