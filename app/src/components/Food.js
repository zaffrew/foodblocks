import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {ActivityIndicator, Avatar, Button, List, Modal, Portal, Surface, Text, Title} from "react-native-paper";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getRecipe} from "../scraper/Scraper";
import colors from '../../settings/colors';
import ListView from "./lists/ListOfLists";
import CreateList from "./lists/CreateList";
import withProps from "../utils/withProps";

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R
//TODO: add nutrition values
//TODO: change the ordering of the page so the description isn't as big.

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    }),
    add_to_list: (URL, listName) => ({
        type: ACTIONS.ADD_TO_LIST,
        URL,
        name: listName,
    })
})

(class Food extends React.Component {
    //this fixes the error of updating a non-mounted component
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            pressed: props.saved,
            recipeVisible: false,
            selectorVisible: false,
            listVisible: false,
            addListVisible: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.add_to_history(this.props.URL);
        getRecipe(this.props.URL).then(recipe => {
            if (this._isMounted) {
                this.setState({recipe})
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    _showList = () => this.setState({listVisible: true})
    _hideList = () => this.setState({listVisible: false})

    _showAddList = () => this.setState({addListVisible: true})
    _hideAddList = () => this.setState({addListVisible: false})


    render() {
        const recipe = this.state.recipe;
        if (!recipe) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                </View>
            )
        }

        const ingredients = recipe.ingredients.map((text, i) =>
            <View key={i} style={(i % 2 == 0) ? bodyStyle.even : bodyStyle.odd}>
                <Text style={textStyles.body}>{text}</Text>
            </View>
        );

        const directions = recipe.directions.map((text, i) =>
            <View key={i} style={[(i % 2 == 0) ? bodyStyle.even : bodyStyle.odd, {flexDirection: 'row'}]}>
                <Text style={[textStyles.body, {paddingHorizontal: 5, fontSize: 16}]}>{i + 1}</Text>
                <Text style={[textStyles.body, {flex: 1, flexShrink: 1}]}>{text}</Text>
            </View>
        );

        const timing = []
        Object.keys(recipe.time).forEach((key, i) => {
            const value = recipe.time[key]
            if (value) {
                timing.push(
                    <View key={i} style={{flexDirection: 'row', padding: 10}}>
                        <Avatar.Text size={40} labelStyle={{fontSize: 14}} label={moment.duration(value).asMinutes()}/>
                        <Text style={{
                            textAlignVertical: 'center',
                            padding: 10
                        }}>Minutes {capitalizeFirstLetter(key)} Time</Text>
                    </View>)
            }
        })

        const timingComponent = timing.length == 0 ? null : (
            <View style={{paddingVertical: 10}}>
                <Title style={textStyles.heading}>Time needed</Title>
                {timing}
            </View>
        );

        const bubble_info = (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 60,
                    paddingTop: 5
                }}>
                    <Avatar.Text labelStyle={{fontSize: 16}}
                                 label={recipe.time.total ? moment.duration(recipe.time.total).asMinutes() : ''}/>
                    <Avatar.Text labelStyle={{fontSize: 16}} label={recipe.ingredients.length}/>
                    <Avatar.Text labelStyle={{fontSize: 16}} label={recipe.nutrition.calories}/>
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
            <Surface style={surfaceStyles.surface}>
                <Button color={colors.foodblocksRed} icon='close' onPress={this._hideRecipe}></Button>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title style={textStyles.title}>{recipe.name}</Title>
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
                        }]}>{recipe.description}</Text>
                        <Title style={textStyles.heading}>Ingredients Required</Title>
                        {ingredients}
                        {timingComponent}
                        <Title style={textStyles.heading}>Directions</Title>
                        {directions}
                    </View>
                </ScrollView>
            </Surface>
        )

        const add_foodblock_view = (
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
        )

        const main_view = (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: recipe.image}}/>
                <View style={{paddingBottom: 20}}>
                    <Title style={textStyles.title}>{recipe.name}</Title>
                    <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                        <Text style={[textStyles.sub, {color: 'grey'}]}>{recipe.source.toUpperCase()}</Text>
                        <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}} compact={true}>
                            MORE INFO
                        </Button>
                        <Button color={'purple'} onPress={this._showList}>
                            Add to List
                        </Button>
                    </View>
                    {bubble_info}
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

        const list_view = (
            <Surface style={styles.surface}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <List.Subheader>Pick a list</List.Subheader>
                    <Button onPress={this._showAddList}>Create new list</Button>
                </View>
                <ListView onPress={name => this.props.add_to_list(recipe.URL, name)}/>
            </Surface>
        )

        return (
            <View style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
                <Portal>
                    <Modal visible={this.state.recipeVisible} onDismiss={this._hideRecipe}>
                        {recipe_info}
                    </Modal>
                    <Modal visible={this.state.selectorVisible} onDismiss={this._hideSelector}>
                        {add_foodblock_view}
                    </Modal>
                    <Modal visible={this.state.listVisible} onDismiss={this._hideList}>
                        {list_view}
                    </Modal>
                    <Modal visible={this.state.addListVisible} onDismiss={this._hideAddList}>
                        <Surface style={surfaceStyles.surface}>
                            <CreateList onSubmit={this._hideAddList}/>
                        </Surface>
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
        padding: 2,
    },
    odd: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: colors.lightGrey,
        padding: 2,
    },
    even: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
        padding: 2,
    }
})

const circleStyle = StyleSheet.create({
    circle: {
        height: 65,
        width: 65,
        borderRadius: 35,
        backgroundColor: colors.foodblocksRed,
        fontSize: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
})

const bodyStyle = StyleSheet.create({
    odd: {
        backgroundColor: '#ffffff',
        padding: 4,
        flex: 1,
    },
    even: {
        backgroundColor: colors.lightGrey2,
        padding: 4,
        flex: 1,
    }
})
