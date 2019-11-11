import React from 'react'

import styles from './styles'
import {TouchableOpacity, View, Image, Text} from 'react-native'

export default class InteractiveTextImage extends React.Component {
    static defaultProps = {
        width: 100,
        height: 100,
        textStyle: styles.heading,
    };

    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            width: props.width,
            height: props.height,
            text: props.text,
            onTap: this.onTap,
            textStyle: props.textStyle,
        }
    }

    onTap = function () {
        console.log(this.props.text, "was tapped.")
    };

    render() {
        return (
            <View style={[styles.centeredContainer, {margin: 20}]}>
                <TouchableOpacity style={styles.centeredContainer} onPress={() => this.onTap()}>
                    <Image style={{width: this.state.width, height: this.state.height}} source={this.state.image}/>
                    <Text style={this.state.textStyle}>{this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
