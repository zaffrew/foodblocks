import React from 'react'

import styles from '../../settings/styles'
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { Avatar, Button, Card, Title, Paragraph, withTheme } from 'react-native-paper';
import defaultImage from "../../assets/default-image.jpg";
//import FoodScreen from './Food';

export default withTheme(class InteractiveTextImage extends React.Component {
    static defaultProps = {
        width: 100,
        height: 100,
        textStyle: styles.foodName,
        text: "Default Text",
        image: defaultImage,
        onTap: this.onTap,
    };

    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            width: props.width,
            height: props.height,
            text: props.text,
            page: props.page, // the page to open when you click the image
            onTap: props.onTap,
            textStyle: props.textStyle,
        }
    }

    render() {

        return (
                <Card style={[cardStyle.container]} onPress={() => this.state.onTap()}>
                <Card.Content>
                    <Title>{this.state.text}</Title>
                </Card.Content>
                <Card.Cover style={[cardStyle.image]} source={this.state.image}/>
                </Card>
        );
    }
});

const cardStyle = StyleSheet.create({
    container: {
      width: 200,
      height: 200,
      margin: 8,
    },
    content: {
      padding: 4,
    },
    card: {
      margin: 4,
    },
    image: {
        width: 200,
        height: 150,
    }
  });