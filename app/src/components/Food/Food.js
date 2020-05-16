import {Image, View} from "react-native";
import colors from "../../../settings/colors";
import {ActivityIndicator, Avatar, Button, Modal, Portal, Text, Title} from "react-native-paper";
import React from "react";
import RecipeInfo from "./RecipeInfo";
import {getRecipe} from "../../scraper/Scraper";
import AddFoodblock from "./AddFoodblock";
import Rating from "./Rating";
import {textStyles} from "../../../styles/styles";
import moment from "moment";
import {connect} from "react-redux";
import ACTIONS from "../../state/ACTIONS";
import ListView from "./ListView";


export default connect((state, ownProps) => {
    const saved = state.saved_recipes && state.saved_recipes.filter(URL => {
        return ownProps.URL === URL;
    }).length === 1;

    return {saved}
}, {
    add_to_history: URL => ({
        type: ACTIONS.ADD_FOOD_HISTORY,
        URL,
        time: moment().toISOString(),
    }),
})(Food)

function Food(props) {
    const [recipeVisible, setRecipeVisible] = React.useState(false);
    const [listViewVisible, setListViewVisible] = React.useState(false);
    const [recipe, setRecipe] = React.useState(null);

    //load the recipe
    React.useEffect(() => {
        props.add_to_history(props.URL)

        let canceled = false;

        getRecipe(props.URL).then(recipe => {
            if (!canceled) {
                setRecipe(recipe)
            }
        })
        return () => canceled = true;
    }, [props.URL])

    if (!recipe) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    const addFoodblockButton = <AddFoodblock URL={props.URL} recipe={recipe}/>

    const bubble_info = (
        <React.Fragment>
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
        </React.Fragment>
    );

    const main_view = (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: recipe.image}}/>
            <View style={{paddingBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <Title style={textStyles.title}>{recipe.name}</Title>
                    <Rating URL={props.URL}/>
                </View>
                <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Text style={[textStyles.sub, {color: 'grey'}]}>{recipe.source.toUpperCase()}</Text>
                    <ListView URL={props.URL}/>
                </View>
                {bubble_info}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingHorizontal: 20,
                    paddingTop: 15,
                }}>
                    <Button dark={true} mode='contained' contentStyle={{paddingVertical: 10}} color={colors.orange}
                            onPress={() => setRecipeVisible(true)}>
                        Get Started
                    </Button>
                    {addFoodblockButton}
                </View>
            </View>
        </View>
    );

    return (
        <View style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
            <Portal>
                <Modal visible={recipeVisible} onDismiss={() => setRecipeVisible(false)}>
                    <RecipeInfo onDismiss={() => setRecipeVisible(false)} recipe={recipe}
                                addFoodblockButton={addFoodblockButton}/>
                </Modal>
            </Portal>
            {main_view}
        </View>
    )
}
