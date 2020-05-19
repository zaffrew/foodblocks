import {View} from "react-native";
import {Button, Modal, Portal, Surface, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {connect} from 'react-redux'
import {surfaceStyles, textStyles} from "../../../styles/styles";
import * as MealSchedule from "../../utils/MealSchedule";

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

    function save() {
        MealSchedule.scheduleMeal(props.recipe, date)
        setPickerMode('hidden')
        //TODO: show snackbar
    }

    function unsave() {
        MealSchedule.unscheduleMeal(props.URL)

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
                        onPress={save}>
                    Save
                </Button>
            </View>
            }
        </View>
    );

    const add_foodblock_button = (
        <Button icon={props.plan ? 'close' : ''} mode={props.plan ? 'outlined' : 'contained'}
                contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                onPress={() => {
                    if (props.plan) {
                        unsave();
                    } else {
                        setPickerMode('date')
                    }
                }}
                style={{flex: 0.9}}>
            {props.plan ? formatDate(props.plan.eventDate) : "Add foodblock"}
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
