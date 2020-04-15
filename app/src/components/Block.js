import {ActivityIndicator, Card, Text} from "react-native-paper";
import {Image} from "react-native";
import React from "react";

export default class Block extends React.Component {

    state = {
        loaded: true
    }

    componentDidMount() {
        this.props.getData().then(({image, title}) => {
            this.setState({image, title, loaded: true})
        })
    }

    render() {
        const content = this.state.loaded ? [
            <Card.Content key={0} style={{flex: 1}}>
                <Text>{this.state.title}</Text>
            </Card.Content>,
            <Image key={1} style={{flex: 2, resizeMode: 'cover'}} source={{uri: this.state.image}}/>
        ] : <ActivityIndicator/>

        return (
            <Card style={{margin: this.props.margin, flex: 1, height: this.props.height, width: this.props.width}}
                  onPress={this.props.onPress}>
                {content}
            </Card>
        )
    }
}
