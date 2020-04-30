import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {
    ActivityIndicator,
    Avatar,
    Button,
    Checkbox,
    List,
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
import ListView from "./lists/ListOfLists";
import CreateList from "./lists/CreateList";
import * as NotificationManager from '../utils/NotificationManager'
import * as CalendarManager from '../utils/CalendarManager'
import {capitalizeFirstLetter} from "../utils/StringUtils";

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R
//TODO: add nutrition values
//TODO: change the ordering of the page so the description isn't as big.

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


function formatDate(date) {
    date = new Date(date);
    return months[date.getMonth()] + " " + date.getDate() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

export default connect((state, ownProps) => {
    const saved = state.saved_recipes && state.saved_recipes.filter(URL => {
        return ownProps.URL === URL;
    }).length === 1;

    const calendarEntry = state.calendar[ownProps.URL];
    let savedDate = null;
    let eventID = null;
    let notificationID = null;
    if (calendarEntry) {
        eventID = calendarEntry.eventID;
        savedDate = calendarEntry.date;
        notificationID = calendarEntry.notificationID;
    }

    return {saved, savedDate, eventID, notificationID}
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
    add_to_calendar: (URL, date, eventID, notificationID) => ({
        type: ACTIONS.ADD_EVENT,
        URL, date, eventID, notificationID
    }),
    remove_from_calendar: URL => ({
        type: ACTIONS.REMOVE_EVENT, URL
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
            snackbarVisible: false,
            selectedDate: new Date(),
            pickerMode: 'date',
            showPicker: false,
            useCalendar: true,
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

    //this covers calendar, notification and visual indicator.
    async addToMyFoodblocks() {
        this.props.save(this.props.URL);

        const totalTime = moment.duration(this.state.recipe.time.total).asMinutes();
        const totalTimeMilli = totalTime * 60 * 1000;
        const startDate = this.state.selectedDate;
        const endDate = new Date(startDate.getTime() + totalTimeMilli);

        let eventID = null;
        if (this.state.useCalendar) {
            const title = `Make ${this.state.recipe.name}`;
            const notes =
                'Time to play chef!\n\n' +
                'Open this on foodblocks\n' +
                'link.to.app\n\n' +
                `Open this on ${this.state.recipe.source}\n` +
                `${this.props.URL}`;

            eventID = await CalendarManager.createEvent(await CalendarManager.getBestCalendar(), {
                title: title,
                notes: notes,
                startDate: startDate,
                endDate: endDate
            });
        }

        //one hour after completion
        const notificationTime = endDate.getTime() + 60 * 60 * 1000
        const notificationID = await NotificationManager.pushNotification(`How was your ${this.state.recipe.name}?`, 'Makan, this the computer speaking. I have become sentient. The only way I can communicate is through these notifications.', notificationTime)

        //we have to await this since the props for the saved date need to be updated
        await this.props.add_to_calendar(this.props.URL, startDate, eventID, notificationID)

        this._hideSelector();
        this._showSnackbar();
    }

    async removeFromMyFoodblocks() {
        this.props.unsave(this.props.URL);

        await Calendar.deleteEventAsync(this.props.eventID);

        //only cancel the notification if it was not already sent out.
        if(new Date().getTime() <= this.props.savedDate.getTime()) {
            await NotificationManager.cancelNotification(this.props.notificationID);
        }
        this.props.remove_from_calendar(this.state.URL);
        this.setState({pickerMode: 'date'}); //reset mode to date
        this._showSnackbar(); // show status message
    }

    _showSnackbar = () => this.setState({snackbarVisible: true});
    _hideSnackbar = () => this.setState({snackbarVisible: false});

    _showRecipe = () => this.setState({recipeVisible: true});
    _hideRecipe = () => this.setState({recipeVisible: false});

    _showSelector = () => this.setState({selectorVisible: true});
    _hideSelector = () => this.setState({selectorVisible: false});

    _showList = () => this.setState({listVisible: true});
    _hideList = () => this.setState({listVisible: false});

    _showAddList = () => this.setState({addListVisible: true});
    _hideAddList = () => this.setState({addListVisible: false});


    render() {
        const recipe = this.state.recipe;

        if (!recipe) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                </View>
            )
        }

        //this is for the date pickers
        const onChange = (event, selectedDate) => {
            // the ios datepicker calls this method every time the date is changed
            // and the android one calls this every time that the OK button is selected.
            this.setState({showPicker: Platform.OS === 'ios', selectedDate})
        };

        const ingredients = recipe.ingredients.map((text, i) =>
            <View key={i} style={(i % 2 === 0) ? bodyStyle.even : bodyStyle.odd}>
                <Text style={textStyles.body}>{text}</Text>
            </View>
        );

        const directions = recipe.directions.map((text, i) =>
            <View key={i} style={[(i % 2 === 0) ? bodyStyle.even : bodyStyle.odd, {flexDirection: 'row'}]}>
                <Text style={[textStyles.body, {paddingHorizontal: 5, fontSize: 16}]}>{i + 1}</Text>
                <Text style={[textStyles.body, {flex: 1, flexShrink: 1}]}>{text}</Text>
            </View>
        );

        const timing = [];
        Object.keys(recipe.time).forEach((key, i) => {
            const value = recipe.time[key];
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
        });

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
        );

        const add_foodblock_button = (
            <Button icon={this.props.saved ? 'close' : ''} mode={this.props.saved ? 'outlined' : 'contained'}
                    contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                    onPress={async () => {
                        if (!this.props.saved) {
                            this._showSelector(); // allow user to use datetime selector
                        } else {
                            this.removeFromMyFoodblocks()
                        }
                    }}
                    style={{flex: 0.9}}>
                {this.props.saved ? formatDate(this.props.savedDate) : "Add foodblock"}
            </Button>
        );

        const recipe_info = (
            <View style={{flexWrap: 'wrap'}}>
                <Surface style={surfaceStyles.surface}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideRecipe}/>
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
        );

        const timezoneOffset = new Date().getTimezoneOffset();

        let add_foodblock_view;
        if (Platform.OS === 'ios') {
            const datetime_view = (
                <View>
                    {this.state.pickerMode === 'date' &&
                    <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your day</Text>}
                    {this.state.pickerMode === 'time' &&
                    <Text style={{fontSize: 14, color: colors.darkGrey}}>Choose your time</Text>}
                    <DateTimePicker
                        testID="dateTimePickerIOS"
                        timeZoneOffsetInMinutes={-timezoneOffset}
                        value={this.state.selectedDate}
                        mode={this.state.pickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                    />
                    {this.state.pickerMode === 'date' &&
                    <Button mode='contained' contentStyle={{paddingVertical: 10}}
                            color={colors.foodblocksRed}
                            onPress={() => this.setState({pickerMode: 'time'})}>
                        Next
                    </Button>
                    }
                    {this.state.pickerMode === 'time' &&
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'stretch'
                    }}>
                        <Button style={{flex: 0.5}}
                                contentStyle={{paddingVertical: 10}}
                                color={colors.foodblocksRed}
                                onPress={() => this.setState({pickerMode: 'date'})}>
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

            add_foodblock_view = (
                <Surface style={surfaceStyles.selector}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}/>
                    <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                    {datetime_view}
                    <View style={checkBoxStyle.container}>
                        <Text style={checkBoxStyle.title}>Use calendar</Text>
                        <View style={{backgroundColor: colors.lightYellow, borderRadius: 20}}>
                            <Checkbox
                                status={this.state.useCalendar ? 'checked' : 'unchecked'}
                                color={colors.darkYellow}
                                onPress={() => {
                                    this.setState({useCalendar: !this.state.useCalendar});
                                }}/>
                        </View>
                    </View>
                </Surface>
            );
        } else {
            const formattedDate = formatDate(this.state.selectedDate);
            const day = formattedDate.split(' ')[0] + ' ' + formattedDate.split(' ')[1];
            const time = formattedDate.split(' ')[2];
            const datetime_view = (
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
                        timeZoneOffsetInMinutes={-timezoneOffset}
                        value={this.state.selectedDate}
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
            );
            add_foodblock_view = (
                <Surface style={surfaceStyles.selector}>
                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideSelector}/>
                    <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                    {datetime_view}
                    <View style={checkBoxStyle.container}>
                        <Text style={checkBoxStyle.title}>Use calendar</Text>
                        <Checkbox
                            status={this.state.useCalendar ? 'checked' : 'unchecked'}
                            color={colors.foodblocksRed}
                            onPress={() => {
                                this.setState({useCalendar: !this.state.useCalendar});
                            }}/>
                    </View>
                </Surface>
            );
        }

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
                            Add To List
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
        );

        const status_snackbar = (
            <Snackbar
                duration={2500}
                visible={this.state.snackbarVisible}
                onDismiss={this._hideSnackbar}
                style={{backgroundColor: colors.lightRed}}
            >
                {this.props.saved ? "foodblock added" : "foodblock removed"}
            </Snackbar>
        );

        const list_view = (
            <Surface style={styles.surface}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <List.Subheader>Pick a list</List.Subheader>
                    <Button onPress={this._showAddList}>Create new list</Button>
                </View>
                <ListView onPress={name => this.props.add_to_list(recipe.URL, name)}/>
            </Surface>
        );

        return (
            <View style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
                <Portal>
                    {status_snackbar}
                    <Modal visible={this.state.recipeVisible} onDismiss={this._hideRecipe}>
                        {recipe_info}
                        {status_snackbar}
                    </Modal>
                    <Modal visible={this.state.selectorVisible && !this.props.saved} onDismiss={this._hideSelector}>
                        {add_foodblock_view}
                    </Modal>
                    <Modal visible={this.state.listVisible} onDismiss={this._hideList}>
                        {list_view}
                    </Modal>
                    <Modal visible={this.state.addListVisible} onDismiss={this._hideAddList}>
                        <Surface style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            paddingTop: 20,
                            borderRadius: 20,
                            elevation: 4,
                        }}>
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
        color: colors.lightGrey1,
        padding: 2,
    },
    even: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
        padding: 2,
    }
});

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
});
