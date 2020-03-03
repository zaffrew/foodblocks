import React from 'react'
import {Image} from "react-native";
import {ActivityIndicator, Card, Text} from "react-native-paper";
import {getThumbnail} from "../scraper/Scraper";
import {View} from "react-native";


export default class FoodBlock extends React.Component {
    state = {}

    async componentDidMount() {
        this.setState({data: await getThumbnail(this.props.URL)})
    }

    render() {
        const data = this.state.data

        if (!data) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <Card style={{margin: this.props.margin, flex: 1, height: this.props.height}}
                  onPress={() => {
                      this.props.onPress(data.URL)
                  }}>
                <Card.Content style={{flex: 1}}>
                    <Text>{data.title}</Text>
                </Card.Content>
                <Image style={{flex: 2, resizeMode: 'cover'}}
                       source={{uri: data.img}}/>
            </Card>
        )
    }
}
