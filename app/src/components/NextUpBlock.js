import {ActivityIndicator, Card, Text} from "react-native-paper";
import {Image, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";

export default function NextUpBlock(props) {


    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        let inEffect = true;
        props.getData().then(({image, title}) => {
            if (inEffect) {
                setTitle(title)
                setImage(image)
                setLoaded(true)
            }
        })
        return () => inEffect = false;
    }, [props.getData])

    const content = loaded ?
        <React.Fragment>
            <View style={{shadowColor: '#6c6f73', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, flex: 2, elevation: 1}}>
                <Image style={{borderRadius: 20, flex: 2, resizeMode: 'cover'}} source={{uri: image}}/>
            </View>
            <Card.Content style={{flex: 1, padding: 5}}>
                <Text style={{color: 'white'}}>{title}</Text>
            </Card.Content>
        </React.Fragment> :
        <ActivityIndicator color={'white'} size={(props.height + props.width) / 2} style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}/>

    return (
        <Card style={{shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.8, shadowRadius: 4, shadowColor: '#A8D600', 
        elevation: 5, borderRadius: 20, backgroundColor: '#A8D600', margin: props.margin, flex: 1, height: props.height, width: props.width}}
              onPress={props.onPress}>
            {content}
        </Card>
    )
}

