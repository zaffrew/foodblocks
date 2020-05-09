import {ActivityIndicator, Card, Text} from "react-native-paper";
import {Image} from "react-native";
import React, {useEffect, useState} from "react";

export default function Block(props) {

    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        props.getData().then(({image, title}) => {
            setTitle(title)
            setImage(image)
            setLoaded(true)
        })
    }, [props.getData])

    const content = loaded ?
        <React.Fragment>
            <Card.Content style={{flex: 1}}>
                <Text>{title}</Text>
            </Card.Content>
            <Image style={{flex: 2, resizeMode: 'cover'}} source={{uri: image}}/>
        </React.Fragment> :
        <ActivityIndicator/>

    return (
        <Card style={{margin: props.margin, flex: 1, height: props.height, width: props.width}}
              onPress={props.onPress}>
            {content}
        </Card>
    )
}
