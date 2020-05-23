import {Button, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import {View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

export default function DatetimeIOS(props) {
    const [dateMode, setDateMode] = React.useState(true);
    const [date, setDate] = React.useState(new Date())

    const bottomBar = dateMode ? (
        <Button mode='contained' contentStyle={{paddingVertical: 10}}
                color={colors.foodblocksRed}
                onPress={() => setDateMode(false)}>
            Next
        </Button>
    ) : (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'stretch'
        }}>
            <Button style={{flex: 0.5}}
                    contentStyle={{paddingVertical: 10}}
                    color={colors.foodblocksRed}
                    onPress={() => setDateMode(true)}>
                Back
            </Button>
            <Button style={{flex: 0.5}}
                    mode='contained' contentStyle={{paddingVertical: 10}}
                    color={colors.foodblocksRed}
                    onPress={() => props.save(date)}>
                Save
            </Button>
        </View>
    )

    return (
        <View>
            {dateMode &&
            <Text style={{fontSize: 14, color: colors.darkGrey}}>
                {'Choose your ' + (dateMode ? 'day' : 'time')}
            </Text>}
            <DateTimePicker
                value={date}
                mode={dateMode ? 'date' : 'time'}
                display="default"
                onChange={(event, selectedDate) => setDate(selectedDate)}
                minimumDate={new Date()}
            />
            {bottomBar}
        </View>
    )
}
