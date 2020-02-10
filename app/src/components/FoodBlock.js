import React from 'react'
import {StyleSheet, View} from "react-native";
import {Card, Text} from "react-native-paper";

export default (props) => {
    return (
        <View style={{paddingRight: 5, padding: 10}}>
            <Card style={[cardStyle.container, {width: props.width, height: props.height}]}
                  onPress={props.onPress}>
                <Card.Content>
                    <Text>{props.text}</Text>
                </Card.Content>
                <Card.Cover style={{width: props.width, height: props.height * 0.70}}
                            source={{uri: props.image}}/>
            </Card>
        </View>
    )
}

const cardStyle = StyleSheet.create({
    container: {
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
