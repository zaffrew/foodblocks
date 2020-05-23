import {Button, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import {View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import formatDate from "../../utils/formatDate";

export default function DatetimeAndroid(props) {
    const [pickerMode, setPickerMode] = React.useState('hidden');
    const [date, setDate] = React.useState(new Date());

    const formattedDate = formatDate(date);
    const day = formattedDate.split(' ')[0] + ' ' + formattedDate.split(' ')[1];
    const time = formattedDate.split(' ')[2];


    return (
        <View>
            <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>
                Choose your day
            </Text>
            <Button onPress={() => setPickerMode('date')}
                    icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
                    color={colors.lightRed}>
                {day}
            </Button>
            <Text style={{fontSize: 14, color: colors.darkGrey, padding: 20}}>Choose your time</Text>
            <Button onPress={() => setPickerMode('time')}
                    icon='pencil' mode='outlined' contentStyle={{paddingVertical: 10}}
                    color={colors.lightRed}>
                {time}
            </Button>
            {pickerMode !== 'hidden' && <DateTimePicker
                testID="dateTimePickerAndroid"
                // timeZoneOffsetInMinutes={-timezoneOffset}
                value={date}
                mode={pickerMode}
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                    setPickerMode('hidden')
                    if (date) {
                        setDate(date)
                    }
                }}
                minimumDate={new Date()}
            />}
            <Button style={{marginTop: 20}}
                    mode='contained' contentStyle={{paddingVertical: 10}}
                    color={colors.foodblocksRed}
                    onPress={() => props.save(date)}>
                Save
            </Button>
        </View>
    )
}
