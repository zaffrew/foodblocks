import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {
    ActivityIndicator,
    Avatar,
    Button,
    Checkbox,
    Modal,
    Portal,
    Snackbar,
    Surface,
    Text,
    Title
} from "react-native-paper";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getRecipe} from "../scraper/Scraper";
import colors from '../../settings/colors';
import * as Calendar from 'expo-calendar'; // to interact with system calendar events
import DateTimePicker from '@react-native-community/datetimepicker'; // to display an interface for user to choose date and time

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R
//TODO: add nutrition values
//TODO: change the ordering of the page so the description isn't as big.
const foodblock_calendar_name = 'My foodblocks';

const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
    return months[date.getMonth()] + " " + date.getDate() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
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
        this.state = {
            pressed: props.saved, recipeVisible: false, selectorVisible: false, snackbarVisible: false,
            date: new Date(), pickerMode: 'date', showPicker: false, useCalendar: true, eventId: -1
        }
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

    async addToMyFoodblocks() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.state.recipe.URL);
        if (pressed && this.state.useCalendar) {
            this.addToCalendar();
        }
        this._hideSelector();
        this._showSnackbar();
    }

    async getFoodblocksCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const cals = calendars.filter(each => each.title === foodblock_calendar_name);
        if (cals && cals.length) {
            return cals[0];
        }
        return null;
    }

    async createFoodblocksCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? (await Calendar.getDefaultCalendarAsync()).source
                : {isLocalAccount: true, name: foodblock_calendar_name};

        await Calendar.createCalendarAsync({
            title: foodblock_calendar_name,
            color: colors.foodblocksRed,
            entityType: Calendar.EntityTypes.EVENT, //iOS only
            sourceId: defaultCalendarSource.id, //iOS only
            source: defaultCalendarSource, //android only
            name: foodblock_calendar_name, //android only
            ownerAccount: 'personal', //android only
            accessLevel: Calendar.CalendarAccessLevel.OWNER, //android only
        });
    }

    async addToCalendar() {
        const {status} = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            try {
                //first see if the foodblocks calendar exists
                let calendarSource = await this.getFoodblocksCalendarSource();
                //if the calendar doesnt exist then we try and create a new one
                if (!calendarSource) {
                    await this.createFoodblocksCalendar();
                    calendarSource = await this.getFoodblocksCalendarSource();
                }
                //if it still doesnt exist we go with the default calendar
                if (!calendarSource) {
                    calendarSource = await Calendar.getDefaultCalendarAsync();
                }

                const calendarId = calendarSource.id;
                const totalTime = moment.duration(this.state.recipe.time.total).asMinutes();
                const totalTimeMilli = totalTime * 60 * 1000;
                const startDate = this.state.date;
                const endDate = new Date(startDate.getTime() + totalTimeMilli);
                const title = `Make "${this.state.recipe.name}"`;
                const notes = `Time to play chef!

Open this on foodblocks
link.to.app

Open this on ${this.state.recipe.source}
${this.state.recipe.URL}`;

                const eventId = await Calendar.createEventAsync(calendarId, {
                    title: title,
                    notes: notes,
                    startDate: startDate,
                    endDate: endDate
                });
                this.setState({eventId: eventId});

            } catch (error) {
                console.log('Error:', error);
            }
        }
        //TODO: if the user does not have permissions allowed we should notify them.
    }

    _showSnackbar = () => this.setState({snackbarVisible: true});
    _hideSnackbar = () => this.setState({snackbarVisible: false});

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

        const {recipeVisible, selectorVisible, snackbarVisible, date, pickerMode, useCalendar} = this.state;

        //this is for the date pickers
        const onChange = (event, selectedDate) => {
            // the ios datepicker calls this method every time the date is changed
            // and the android one calls this every time that the OK button is selected.
            this.setState({showPicker: Platform.OS === 'ios', date: selectedDate})
        };

        const onSaveButtonPress = async () => {
            if (!this.state.pressed) {
                // user wants to save recipe
                this._showSelector(); // allow user to use datetime selector
            } else {
                // user wants to remove recipe from saved
                const pressed = !this.state.pressed;
                this.setState({pressed});
                (pressed ? this.props.save : this.props.unsave)(this.state.recipe.URL);

                await Calendar.deleteEventAsync(this.state.eventId);
                this.setState({eventId: -1, pickerMode: 'date'}) //reset mode to date
                this._showSnackbar(); // show status message
            }
        }

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

        const add = "Add foodblock";
        const remove = formatDate(this.state.date);
        const add_foodblock_button = (
            <Button icon={this.props.saved ? 'close' : ''} mode={this.props.saved ? 'outlined' : 'contained'}
                    contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                    onPress={() => onSaveButtonPress()} style={{flex: 0.9}}>{this.props.saved ? remove : add}</Button>
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

        const datetime_view_ios = (
            <View>
                {pickerMode === 'date' && <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your day</Text>}
                {pickerMode === 'time' && <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your time</Text>}
                <DateTimePicker
                    testID="dateTimePickerIOS"
                    timeZoneOffsetInMinutes={-offset}
                    value={date}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
                {pickerMode === 'date' &&
                <Button mode='contained' contentStyle={{paddingVertical: 10}}
                        color={colors.foodblocksRed}
                        onPress={showTimepicker}>
                    Next
                </Button>
                }
                {pickerMode === 'time' &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'stretch'
                }}>
                    <Button style={{flex: 0.5}}
                            contentStyle={{paddingVertical: 10}}
                            color={colors.foodblocksRed}
                            onPress={showDatepicker}>
                        Back
                    </Button>
                    <Button style={{flex: 0.5}}
                            mode='contained' contentStyle={{paddingVertical: 10}}
                            color={colors.foodblocksRed}
                            onPress={() => this.addToMyFoodblocks()}>
                        Save
                    </Button>
                </View>
                }
            </View>
        );

        const formattedDate = formatDate(this.state.date);
        const day = formattedDate.split(' ')[0] + ' ' + formattedDate.split(' ')[1];
        const time = formattedDate.split(' ')[2];
        const datetime_view_android = (
            <View>
                <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>
                    Choose your day
                </Text>
                <Button onPress={() => {
                    this.setState({showPicker: true, pickerMode: 'date'})
                }}
                        icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
                        color={colors.lightRed}>
                    {day}
                </Button>
                <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>Choose your time</Text>
                <Button onPress={() => {
                    this.setState({showPicker: true, pickerMode: 'time'})
                }}
                        icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
                        color={colors.lightRed}>
                    {time}
                </Button>
                {this.state.showPicker && <DateTimePicker
                    testID="dateTimePickerAndroid"
                    timeZoneOffsetInMinutes={-offset}
                    value={date}
                    mode={this.state.pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />}
                <Button style={{marginTop: 20}}
                        mode='contained' contentStyle={{paddingVertical: 10}}
                        color={colors.foodblocksRed}
                        onPress={() => this.addToMyFoodblocks()}>
                    Save
                </Button>
            </View>
        )

        const add_foodblock_view_ios = (
            <Surface style={surfaceStyles.selector}>
                <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}></Button>
                <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                {datetime_view_ios}
                <View style={checkBoxStyle.container}>
                    <Text style={checkBoxStyle.title}>Use calendar</Text>
                    <View style={{backgroundColor: colors.lightYellow, borderRadius: 20}}>
                        <Checkbox
                            status={useCalendar ? 'checked' : 'unchecked'}
                            color={colors.darkYellow}
                            onPress={() => {
                                this.setState({useCalendar: !useCalendar});
                            }}/>
                    </View>
                </View>
            </Surface>
        );

        const add_foodblock_view_android = (
            <Surface style={surfaceStyles.selector}>
                <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}></Button>
                <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                {datetime_view_android}
                <View style={checkBoxStyle.container}>
                    <Text style={checkBoxStyle.title}>Use calendar</Text>
                    <Checkbox
                        status={useCalendar ? 'checked' : 'unchecked'}
                        color={colors.foodblocksRed}
                        onPress={() => {
                            this.setState({useCalendar: !useCalendar});
                        }}/>
                </View>
            </Surface>
        );

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
                        justifyContent: 'space-around',
                        paddingHorizontal: 20,
                        paddingTop: 15,
                    }}>
                        <Button dark={true} mode='contained' contentStyle={{paddingVertical: 10}} color={colors.orange}
                                onPress={() => this._showRecipe()}>Get Started</Button>
                        {add_foodblock_button}
                    </View>
                </View>
            </View>
        )

        const snackbarMessage = this.props.saved ? "foodblock added" : "foodblock removed";
        const status_snackbar = (
            <Snackbar
                duration={2500}
                visible={snackbarVisible}
                onDismiss={this._hideSnackbar}
                style={{backgroundColor: colors.lightRed}}
            >
                {snackbarMessage}
            </Snackbar>
        );

        return (
            <View style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
                <Portal>
                    {status_snackbar}
                    <Modal visible={recipeVisible} onDismiss={this._hideRecipe}>
                        {recipe_info}
                        {status_snackbar}
                    </Modal>
                    <Modal visible={selectorVisible && !this.props.saved} onDismiss={this._hideSelector}>
                        {Platform.OS === 'ios' ? add_foodblock_view_ios : add_foodblock_view_android}
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
        height: '87%',
        width: '90%',
    },
});

const checkBoxStyle = StyleSheet.create({
    title: {
        fontSize: 14,
        padding: 10,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
    },
    container: {
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'row',
    },
})

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
