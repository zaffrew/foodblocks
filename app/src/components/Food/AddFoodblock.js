import {View} from "react-native";
import {Button, Modal, Portal, Surface, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {connect} from 'react-redux'
import ACTIONS from "../../state/ACTIONS";
import moment from "moment";
import * as CalendarManager from "../../utils/CalendarManager";
import * as NotificationManager from "../../utils/NotificationManager";
import {surfaceStyles, textStyles} from "../../../styles/styles";

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

export default connect((state, props) => {
    const plan = state.planned_foods[props.URL]
    return {plan}
}, {
    addPlan: (URL, plan) => ({
        type: ACTIONS.PLAN_FOOD,
        URL,
        plan,
    }),
    removePlan: URL => ({
        type: ACTIONS.REMOVE_PLAN,
        URL
    })
})(AddFoodblock)

function AddFoodblock(props) {
    const [pickerMode, setPickerMode] = React.useState('hidden');
    const [date, setDate] = React.useState(new Date());
    const [showSnackbar, setShowSnackbar] = React.useState(true);

    const timezoneOffset = new Date().getTimezoneOffset();

    const onChange = (event, selectedDate) => {
        // the ios datepicker calls this method every time the date is changed
        // and the android one calls this every time that the OK button is selected.
        if (Platform.OS === 'android') {
            setPickerMode('hidden')
        }
        setDate(selectedDate)
    };

    //this covers calendar, notification and visual indicator.
    async function addToMyFoodblocks() {
        //TODO: notifications dont work on emulators so test if youre on an emulator
        //TODO: test if permissions are enabled
        const totalTime = moment.duration(props.recipe.time.total).asMinutes();
        const totalTimeMilli = totalTime * 60 * 1000;
        const endDate = new Date(date.getTime() + totalTimeMilli);

        const title = `Make ${props.recipe.name}`;
        const notes =
            'Time to play chef!\n\n' +
            'Open this on foodblocks\n' +
            'link.to.app\n\n' +
            `Open this on ${props.recipe.source}\n` +
            `${props.URL}`;

        const eventID = await CalendarManager.createEvent(await CalendarManager.getBestCalendar(), {
            title: title,
            notes: notes,
            startDate: date,
            endDate: endDate
        });

        const notificationDate = new Date(endDate.getTime())
        notificationDate.setHours(notificationDate.getHours() + 1);
        const notificationID = await NotificationManager.pushNotification(`How was your ${props.recipe.name}?`, 'Makan, this the computer speaking. I have become sentient. The only way I can communicate is through these notifications.', notificationDate)

        //we have to await this since the props for the saved date need to be updated
        await props.addPlan(URL, {
            eventDate: date,
            eventID,
            notificationID,
            notificationDate
        })

        setPickerMode('hidden');
        //TODO: show snackbar
    }

    async function removeFromMyFoodblocks() {
        props.removePlan(props.URL)

        await CalendarManager.deleteEvent(props.plan.eventID)
        await NotificationManager.cancelNotification(props.notificationID);
        setPickerMode('date')
        //TODO: show snackbar
    }

    const datetime_view_ios = (
        <View>
            {pickerMode === 'date' &&
            <Text style={{fontSize: 14, color: colors.darkGrey}}>
                Choose your day
            </Text>}
            {pickerMode === 'time' &&
            <Text style={{fontSize: 14, color: colors.darkGrey}}>
                Choose your time
            </Text>}
            <DateTimePicker
                testID="dateTimePickerIOS"
                timeZoneOffsetInMinutes={-timezoneOffset}
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
                    onPress={() => setPickerMode('time')}>
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
                        onPress={() => setPickerMode('date')}>
                    Back
                </Button>
                <Button style={{flex: 0.5}}
                        mode='contained' contentStyle={{paddingVertical: 10}}
                        color={colors.foodblocksRed}
                        onPress={addToMyFoodblocks}>
                    Save
                </Button>
            </View>
            }
        </View>
    );

    // const formattedDate = formatDate(date);
    // const day = formattedDate.split(' ')[0] + ' ' + formattedDate.split(' ')[1];
    // const time = formattedDate.split(' ')[2];

    // const datetime_view_android = (
    //     <View>
    //         <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>
    //             Choose your day
    //         </Text>
    //         <Button onPress={() => setPickerMode('date')}
    //                 icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
    //                 color={colors.lightRed}>
    //             {day}
    //         </Button>
    //         <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>Choose your time</Text>
    //         <Button onPress={() => setPickerMode('time')}
    //                 icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
    //                 color={colors.lightRed}>
    //             {time}
    //         </Button>
    //         {pickerMode !== 'hidden' && <DateTimePicker
    //             testID="dateTimePickerAndroid"
    //             timeZoneOffsetInMinutes={-timezoneOffset}
    //             value={date}
    //             mode={pickerMode}
    //             is24Hour={true}
    //             display="default"
    //             onChange={onChange}
    //             minimumDate={new Date()}
    //         />}
    //         <Button style={{marginTop: 20}}
    //                 mode='contained' contentStyle={{paddingVertical: 10}}
    //                 color={colors.foodblocksRed}
    //                 onPress={addToMyFoodblocks}>
    //             Save
    //         </Button>
    //     </View>
    // );

    const add_foodblock_button = (
        <Button icon={props.plan ? 'close' : ''} mode={props.plan ? 'outlined' : 'contained'}
                contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                onPress={async () => {
                    if (props.plan) {
                        props.removePlan(props.URL)
                    } else {
                        setPickerMode('date')
                    }
                }}
                style={{flex: 0.9}}>
            {props.plan ? formatDate(props.plan.startDate) : "Add foodblock"}
        </Button>
    );

    return (
        <React.Fragment>
            {add_foodblock_button}
            <Portal>
                <Modal visible={pickerMode !== 'hidden'} onDismiss={() => setPickerMode('hidden')}>
                    <Surface style={surfaceStyles.selector}>
                        <Button color={colors.foodblocksRed} icon='close' onPress={() => setPickerMode('hidden')}/>
                        <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                        {datetime_view_ios}
                    </Surface>
                </Modal>
            </Portal>
        </React.Fragment>
    )
}
