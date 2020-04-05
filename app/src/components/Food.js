import React, {useState} from 'react'
import {Image, StyleSheet, View, ScrollView} from 'react-native'
import {ActivityIndicator, Button, Surface, Modal, Portal, Title, Text, Avatar, Paragraph} from "react-native-paper";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getRecipe} from "../scraper/Scraper";
import colors from '../../settings/colors';
import * as Calendar from 'expo-calendar'; // to interact with system calendar events
import * as Permissions from 'expo-permissions';
import DateTimePicker from '@react-native-community/datetimepicker'; // to display an interface for user to choose date and time

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
    })
})

(class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: props.saved, recipeVisible: false, selectorVisible: false, 
            date: new Date(), pickerMode: 'date', showPicker: false}
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

    async addFoodblock() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.state.recipe.URL);
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            try {
                const calendarId = (await Calendar.getDefaultCalendarAsync()).id;
                const totalTime = moment.duration(this.state.recipe.time.total).asMinutes();
                const totalTimeMilli = totalTime * 60 * 1000
                const startDate = this.state.date;
                const endDate = new Date(startDate.getTime() + totalTimeMilli);
                const eventId = await Calendar.createEventAsync(calendarId, {title: 'New foodblock', startDate: startDate, endDate: endDate});
            }
            catch(error) {
                console.log('Error', error);
            }
        }
    }

    _showRecipe = () => this.setState({recipeVisible: true});
    _hideRecipe = () => this.setState({recipeVisible: false});

    _showSelector = () => this.setState({selectorVisible: true});
    _hideSelector = () => this.setState({selectorVisible: false});

    render() {
        const recipe = this.state.recipe;

        const offset = new Date().getTimezoneOffset(); 

        if (!recipe) {
            return <ActivityIndicator/>
        }

        const {recipeVisible, selectorVisible, date, pickerMode, showPicker} = this.state;
      
        const onChange = (event, selectedDate) => {
          const currentDate = selectedDate || date;
          this.setState({showPicker: Platform.OS === 'ios'});
          this.setState({date: currentDate});
        };
      
        const showMode = currentMode => {
          this.setState({showPicker: true});
          this.setState({pickerMode: currentMode});
        };
      
        const showDatepicker = () => {
            this.setState({pickerMode: 'date'});
        };
      
        const showTimepicker = () => {
            this.setState({pickerMode: 'time'});
        };

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
                    <View key={i} style={{padding: 10}}>
                        <Avatar.Text size={40} labelStyle={{fontSize: 14}} label={moment.duration(value).asMinutes()}/>
                        <Text style={{
                            textAlignVertical: 'center',
                            paddingVertical: 5
                        }}>{capitalizeFirstLetter(key)}</Text>
                    </View>)
            }
        })

        const bubble_info = (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 60,
                    paddingTop: 5
                }}>
                    <Avatar.Text labelStyle={{fontSize: 16}} label={moment.duration(recipe.time.total).asMinutes()}/>
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
            <View style={{flexWrap: 'wrap'}}>
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
                            <View style={{padding: 5, backgroundColor: colors.lightYellow, borderRadius: 10}}>
                            <Text style={[textStyles.sub, {
                                textAlign: 'center', color: colors.darkYellow,
                            }]}>{recipe.description}</Text>
                            </View>

                            <Title style={textStyles.heading}>Ingredients Required</Title>
                            {ingredients}
                            <View>
                                <Title style={textStyles.heading}>Time needed</Title>
                                <View style={{flexDirection: 'row'}}>
                                    {timing}
                                </View>
                            </View>
                            <Title style={textStyles.heading}>Directions</Title>
                            {directions}
                        </View>
                    </ScrollView>
                </Surface>
            </View>
        )

        const datetime_view = (
            <View>
                {pickerMode === 'date' && <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your day</Text>}
                {pickerMode === 'time' && <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your time</Text>}
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={-offset}
                    value={date}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                {Platform.OS === 'ios' && pickerMode === 'date' && <Button mode='contained' contentStyle={{paddingVertical: 10}}
                        color={colors.foodblocksRed}
                        onPress={showTimepicker}>Next</Button>}
                {Platform.OS === 'ios' && pickerMode === 'time' && <View style={{flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'stretch'}}>
                    <Button style={{flex:0.5}}
                        contentStyle={{paddingVertical: 10}}
                        color={colors.foodblocksRed}
                        onPress={showDatepicker}>Back</Button>
                    <Button style={{flex:0.5}}
                            mode='contained' contentStyle={{paddingVertical: 10}}
                            color={colors.foodblocksRed}
                            onPress={() => this.addFoodblock()}>Save</Button>
                </View>}
            </View>
        );

        const add_foodblock_view = (
            <View>
                <Surface style={surfaceStyles.selector}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}></Button>
                    <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                    {datetime_view}
                </Surface>
            </View>
        )

        const main_view = (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: recipe.image}}/>
                <View style={{paddingBottom: 20}}>
                    <Title style={textStyles.title}>{recipe.name}</Title>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[textStyles.sub, {color: 'grey'}]}>{recipe.source.toUpperCase()}</Text>
                        <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}} compact={true}>
                            MORE INFO
                        </Button>
                    </View>
                    {bubble_info}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingTop: 15
                    }}>
                        <Button dark={true} mode='contained' contentStyle={{paddingVertical: 10}} color={colors.yellow}
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
        alignSelf: 'center',
        height: '85%',
        width: '90%',
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
