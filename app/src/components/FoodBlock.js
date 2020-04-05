import React from 'react'
import {Image} from "react-native";
import {ActivityIndicator, Card, Text} from "react-native-paper";
import {getThumbnail} from "../scraper/Scraper";

export default class FoodBlock extends React.Component {
    state = {};

    componentDidMount() {
        getThumbnail(this.props.URL).then(recipe => {
            this.setState({recipe})
        })
    }

    render() {
        const recipe = this.state.recipe;

        if (!recipe) {
            return (
                <Card style={{
                    margin: this.props.margin,
                    height: this.props.height,
                    width: this.props.width,
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row'
                    // im not sure why but this flex direction row is needed
                }}>
                    <ActivityIndicator/>
                </Card>
            )
        }

        return (
            <Card style={{margin: this.props.margin, flex: 1, height: this.props.height, width: this.props.width}}
                  onPress={() => {
                      this.props.onPress(recipe.URL)
                  }}>
                <Card.Content style={{flex: 1}}>
                    <Text>{recipe.name}</Text>
                </Card.Content>
                <Image style={{flex: 2, resizeMode: 'cover'}}
                       source={{uri: recipe.image}}/>
            </Card>
        )
    }
}
