import React from 'react'
import {Image} from "react-native";
import {Card, Text} from "react-native-paper";

export default (props) => {
    return (
        <Card style={{margin: props.margin, flex: 1, height: props.height}}
              onPress={props.onPress}>
            <Card.Content style={{flex: 1}}>
                <Text>{props.text}</Text>
            </Card.Content>
            <Image style={{flex: 2, resizeMode: 'cover'}}
                   source={{uri: props.image}}/>
        </Card>
    )
}
