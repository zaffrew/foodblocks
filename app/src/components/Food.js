import React from 'react'
import {Image, StyleSheet, View, ScrollView} from 'react-native'
import {ActivityIndicator, Button, Surface, Modal, Portal, Title, Text, Avatar} from "react-native-paper";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getRecipe} from "../scraper/Scraper";
import colors from '../../settings/colors';

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
        this.state = {pressed: props.saved, recipeVisible: false, selectorVisible: false}
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

    addFoodblock() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.state.recipe.URL);
    }

    _showRecipe = () => this.setState({recipeVisible: true});
    _hideRecipe = () => this.setState({recipeVisible: false});

    _showSelector = () => this.setState({selectorVisible: true});
    _hideSelector = () => this.setState({selectorVisible: false});

    render() {
        const recipe = this.state.recipe;

        if (!recipe) {
            return <ActivityIndicator/>
        }

        const {recipeVisible, selectorVisible} = this.state;

        const ingredients = recipe.ingredients.map((text, i) =>
            <Text style={textStyles.body} key={i} style={{padding: 5, fontSize: 12}}>{text}</Text>);
        const directions = recipe.directions.map((text, i) =>
            <Text style={textStyles.body} key={i} style={{padding: 5, fontSize: 12}}>{text}</Text>);

        const timing = (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 60,
                    paddingTop: 5
                }}>
                    <Avatar.Text label={moment.duration(recipe.time.total).asMinutes()}/>
                    <Avatar.Text/>
                    <Avatar.Text/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 60,
                    paddingTop: 5
                }}>
                    <Text style={[textStyles.circleText, {color: 'black'}]}>Minutes</Text>
                    <Text style={[textStyles.circleText, {color: 'black'}]}>Ingredients</Text>
                    <Text style={[textStyles.circleText, {color: 'black'}]}>Calories</Text>
                </View>
            </View>
        )

        const add_foodblock_button = (
            <Button mode='contained' contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                    onPress={() => this._showSelector()}>Add foodblock</Button>
        )

        const recipe_info = (
            <View>
                <Surface style={surfaceStyles.surface}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideRecipe}></Button>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Title style={textStyles.title}>{recipe.title}</Title>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={[textStyles.sub, {color: 'grey'}]}>{recipe.source.toUpperCase()}</Text>
                            <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}}
                                    compact={true}>MORE INFO</Button>
                        </View>
                        {add_foodblock_button}
                        <View>
                            <Text style={[textStyles.sub, {textAlign: 'center'}]}>Recipe
                                by {recipe.author}</Text>
                            <Text style={[textStyles.sub, {
                                textAlign: 'center',
                                fontStyle: 'italic'
                            }]}>{recipe.description}</Text>
                            {timing}
                            <Title style={textStyles.heading}>Ingredients Required</Title>
                            {ingredients}
                            <Title style={textStyles.heading}>Directions</Title>
                            {directions}
                        </View>
                    </ScrollView>
                </Surface>
            </View>
        )

        const add_foodblock_view = (
            <View>
                <Surface style={surfaceStyles.selector}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}></Button>
                    <Text style={textStyles.heading}>Plan your meal</Text>
                    <View>
                        <Text style={{paddingVertical: 20}}>*Insert selector*</Text>
                        <Button mode='contained' contentStyle={{paddingVertical: 10}}
                                color={colors.foodblocksRed}
                                onPress={() => this.addFoodblock()}>Save</Button>
                    </View>
                </Surface>
            </View>
        )

        const main_view = (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: recipe.image}}/>
                <View style={{paddingBottom: 5}}>
                    <Title style={textStyles.title}>{recipe.title}</Title>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[textStyles.sub, {color: 'grey'}]}>{recipe.source.toUpperCase()}</Text>
                        <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}} compact={true}>
                            MORE INFO
                        </Button>
                    </View>
                    {timing}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingTop: 15
                    }}>
                        <Button mode='contained' contentStyle={{paddingVertical: 10}} color={colors.green}
                                onPress={() => this._showRecipe()}>Get Started</Button>
                        {add_foodblock_button}
                    </View>
                </View>
            </View>
        )

        return (
            <View style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
                <Portal>
                    <Modal visible={recipeVisible} onDismiss={this._hideRecipe}>
                        {recipe_info}
                    </Modal>
                    <Modal visible={selectorVisible} onDismiss={this._hideSelector}>
                        {add_foodblock_view}
                    </Modal>
                </Portal>
                {main_view}
            </View>
        )
    }
})

const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },
    selector: {
        padding: 20,
        borderRadius: 20,
        elevation: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '70%',
    },
});

const textStyles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontFamily: 'montserrat',
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        fontFamily: 'montserrat'
    },
    sub: {
        fontSize: 14,
        paddingLeft: 20,
        paddingRight: 10,
        padding: 9,
        fontFamily: 'montserrat'
    },
    button: {
        fontSize: 14,
        color: colors.foodblocksRed,
        fontFamily: 'montserrat'
    },
    circleText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'montserrat'
    },
    body: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
    },
})

const circleStyle = StyleSheet.create({
    circle: {
        height: 65,
        width: 65,
        borderRadius: 35,
        backgroundColor: colors.foodblocksRed,
        fontSize: 16,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
})
