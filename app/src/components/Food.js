import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Caption, Card, IconButton, Paragraph, Surface, Title} from "react-native-paper";
import styles from "../../settings/styles";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getRecipe} from "../scraper/Scraper";
import {SafeAreaView} from "react-native-safe-area-context";

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R
//TODO: add nutrition values
//TODO: change the ordering of the page so the description isn't as big.

export default connect((state, ownProps) => {
    const saved = state.saved_recipes && state.saved_recipes.filter(URL => {
        return ownProps.URL === URL
    }).length === 1;

    return {saved}
}, {
    save: (URL) => ({
        type: ACTIONS.SAVE_RECIPE,
        URL
    }),
    unsave: (URL) => ({
        type: ACTIONS.UNSAVE_RECIPE,
        URL
    }),
    add_to_history: URL => ({
        type: ACTIONS.ADD_FOOD_HISTORY,
        URL,
        time: moment().toISOString(),
    })
})
(class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: props.saved}
    }

    componentDidMount() {
        //TODO: this call lags out the opening of the food
        this.props.add_to_history(this.props.URL);
        getRecipe(this.props.URL).then(recipe => this.setState({recipe}))
    }

    componentDidUpdate() {
        if (this.props.saved !== this.state.pressed) {
            this.setState({pressed: this.props.saved})
        }
    }

    onPress() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.state.recipe.URL);
    }

    render() {
        const recipe = this.state.recipe;
        if (!recipe) {
            return <ActivityIndicator/>
        }
        const ingredients = recipe.ingredients.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>);

        const directions = recipe.directions.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>);

        const timing = [];
        if (recipe.time.prep) {
            timing.push(
                <Paragraph key={'prep'} style={{padding: 5, fontSize: 12}}>
                    Prep Time: {recipe.time.prep}
                </Paragraph>)
        }
        if (recipe.time.cook) {
            timing.push(
                <Paragraph key={'cook'} style={{padding: 5, fontSize: 12}}>
                    Prep Time: {recipe.time.cook}
                </Paragraph>)
        }
        if (recipe.time.total) {
            timing.push(
                <Paragraph key={'total'} style={{padding: 5, fontSize: 12}}>
                    Prep Time: {recipe.time.total}
                </Paragraph>)
        }

        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <Card style={{height: 300}}>
                        <Image style={{flex: 1, resizeMode: 'stretch'}} source={{uri: recipe.image}}/>
                    </Card>
                    <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>{recipe.name}</Title>
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
                            <Title style={{padding: 5, fontSize: 18}}>Author: {recipe.author}</Title>
                            <Paragraph>{recipe.description}</Paragraph>
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Title style={styles.subtitle}>Get started</Title>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Ingredients needed</Title>
                            {ingredients}
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Time needed</Title>
                            {timing}
                        </Surface>
                    </View>
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
                            Source: {recipe.source}
                        </Caption>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
})
const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 20,
        elevation: 4,
    },
});
