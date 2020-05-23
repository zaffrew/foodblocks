import {Button, Modal, Portal, Surface, Text} from "react-native-paper";
import colors from "../../../settings/colors";
import React from "react";
import {connect} from 'react-redux'
import {surfaceStyles, textStyles} from "../../../styles/styles";
import * as MealSchedule from "../../utils/MealSchedule";
import DatetimeAndroid from "./DatetimeAndroid";
import DatetimeIOS from "./DatetimeIOS";
import formatDate from "../../utils/formatDate";

const Datetime = Platform.OS === 'ios' ? DatetimeIOS : DatetimeAndroid;

export default connect((state, props) => {
    const plan = state.planned_foods[props.URL]
    return {plan}
})(AddFoodblock)

function AddFoodblock(props) {
    const [pickerMode, setPickerMode] = React.useState('hidden');
    const [showSnackbar, setShowSnackbar] = React.useState(true);

    function save(date) {
        MealSchedule.scheduleMeal(props.recipe, date)
        setPickerMode('hidden')
        //TODO: show snackbar
    }

    function unsave() {
        MealSchedule.unscheduleMeal(props.URL)

        //TODO: show snackbar
    }

    const add_foodblock_button = (
        <Button icon={props.plan ? 'close' : ''} mode={props.plan ? 'outlined' : 'contained'}
                contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed}
                onPress={() => {
                    if (props.plan) {
                        unsave();
                    } else {
                        if (Platform.OS === 'ios') {
                            setPickerMode('date')
                        } else {
                            setPickerMode('android')
                        }
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
                        <Datetime save={save}/>
                    </Surface>
                </Modal>
            </Portal>
        </React.Fragment>
    )
}
