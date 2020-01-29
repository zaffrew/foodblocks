import React from 'react'

import styles from '../../settings/styles'
import {StyleSheet, View} from 'react-native'
import {Card, Title, withTheme} from 'react-native-paper';
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
            textSize: props.textSize,
        }
    }

    render() {

        return (
            <View style={{paddingRight: 5, padding: 10}}>
                <Card style={[cardStyle.container, {width: this.state.width, height: this.state.height}]}
                      onPress={() => this.state.onTap()}>
                    <Card.Content>
                        <Title style={{fontSize: this.state.textSize}}>{this.state.text}</Title>
                    </Card.Content>
                    <Card.Cover style={{width: this.state.width, height: this.state.height * 0.70}}
                                source={this.state.image}/>
                </Card>
            </View>
        );
    }
});

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
