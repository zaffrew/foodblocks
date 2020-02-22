import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import SafeView from '../components/SafeView'
import {Caption, Card, IconButton, Paragraph, Surface, Title} from "react-native-paper";
import styles from "../../settings/styles";
import {connect} from "react-redux";
import {ACTIONS} from "../State";
import moment from "moment";

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R

export default connect((state, ownProps) => {
    const saved = state.recipe_save && state.recipe_save.filter(data => {
        return ownProps.data.URL === data.URL
    }).length === 1

    return {saved}
}, {
    save: (data) => ({
        type: ACTIONS.SAVE_RECIPE,
        data
    }),
    unsave: (data) => ({
        type: ACTIONS.UNSAVE_RECIPE,
        data
    })
})
(class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: props.saved}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.saved !== this.state.pressed) {
            this.setState({pressed: this.props.saved})
        }
    }

    onPress() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.props.data);
    }

    render() {
        const data = this.props.data
        const ingredients = data.ingredients.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>)

        const directions = data.directions.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>)

        return (
            <SafeView style={{flex: 1}}>
                <ScrollView>
                    <Card style={{height: 300}}>
                        <Image style={{flex: 1, resizeMode: 'stretch'}} source={{uri: data.img}}/>
                    </Card>
                    <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>{data.title}</Title>
                    <View style={{paddingVertical: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Title style={styles.subtitle}>Get started</Title>
                            <IconButton
                                color={this.state.pressed ? 'red' : 'black'}
                                icon={'star'}
                                onPress={() => this.onPress()}
                                size={30}
                            />
                        </View>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Author: {data.author}</Title>
                            <Paragraph>{data.description}</Paragraph>
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Title style={styles.subtitle}>Get started</Title>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Ingredients needed</Title>
                            {ingredients}
                        </Surface>
                    </View>
                    {/*<View style={{paddingVertical: 10}}>*/}
                    {/*    <Surface style={surfaceStyles.surface}>*/}
                    {/*        <Title style={{padding: 5, fontSize: 18}}>Tools needed</Title>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 1</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 2</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Makan</Paragraph>*/}
                    {/*    </Surface>*/}
                    {/*</View>*/}
                    {(data.prepTime || data.cookTime || data.totalTime) &&
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Time needed</Title>
                            {data.prepTime && <Paragraph style={{padding: 5, fontSize: 12}}>Prep
                                Time: {moment.duration(data.prepTime).asMinutes()}M</Paragraph>}
                            {data.cookTime && <Paragraph style={{padding: 5, fontSize: 12}}>Cook
                                Time: {moment.duration(data.cookTime).asMinutes()}M</Paragraph>}
                            {data.totalTime && <Paragraph style={{padding: 5, fontSize: 12}}>Total
                                Time: {moment.duration(data.totalTime).asMinutes()}M</Paragraph>}
                        </Surface>
                    </View>}
                    <View>
                        <Title style={[styles.subtitle, {paddingVertical: 10}]}>Steps</Title>
                        <View style={{paddingVertical: 10}}>
                            <Surface style={surfaceStyles.surface}>
                                {directions}
                            </Surface>
                        </View>
                    </View>
                    <View>
                        <Caption>
                            Source: {data.source}
                        </Caption>
                    </View>
                </ScrollView>
            </SafeView>
        )
    }
})
const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 20,
        elevation: 4,
    },
});
