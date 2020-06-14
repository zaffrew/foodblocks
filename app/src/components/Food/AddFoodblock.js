import {Button, Modal, Portal, Surface, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import React from "react";
import {connect} from 'react-redux'
import {surfaceStyles, textStyles} from "../../../styles/styles";
import * as MealSchedule from "../../utils/MealSchedule";
import DatetimeAndroid from "./DatetimeAndroid";
import DatetimeIOS from "./DatetimeIOS";
import formatDate from "../../utils/formatDate";
import Snackbar from "react-native-paper/src/components/Snackbar";
import settings from "../../../settings/appSettings";

//TODO: change times to 12hr by default, maybe allow user to change this in settings
//TODO: snackbar covers up navigation
const Datetime = Platform.OS === 'ios' ? DatetimeIOS : DatetimeAndroid;

export default connect((state, props) => {
    const plan = state.planned_foods[props.URL]
    return {plan}
})(AddFoodblock)

function AddFoodblock(props) {
    const [pickerVisible, setPickerVisible] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState();

    function save(date) {
        MealSchedule.scheduleMeal(props.recipe, date)
        setPickerVisible(false)
        setSnackbarMessage('foodblock added')
    }

    function unsave() {
        MealSchedule.unscheduleMeal(props.URL)
        setSnackbarMessage('foodblock removed')
    }

    const add_foodblock_button = (
        <Button icon={props.plan ? 'close' : ''} mode={props.plan ? 'outlined' : 'contained'}
                contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                onPress={() => {
                    if (props.plan) {
                        unsave();
                    } else {
                        setPickerVisible(true)
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
                <Modal visible={pickerVisible} onDismiss={() => setPickerVisible(false)}>
                    <Surface style={surfaceStyles.selector}>
                        <Button color={colors.foodblocksRed} icon='close' onPress={() => setPickerVisible(false)}/>
                        <Text style={[textStyles.heading]}>Plan your foodblock</Text>
                        <Datetime save={save}/>
                    </Surface>
                </Modal>
                <Snackbar
                    duration={settings.snackbarDuration}
                    visible={snackbarMessage}
                    onDismiss={() => setSnackbarMessage(null)}
                    style={{backgroundColor: colors.lightRed}}
                >
                    {snackbarMessage}
                </Snackbar>
            </Portal>
        </React.Fragment>
    )
}
