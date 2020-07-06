import React from 'react'
import {View} from 'react-native'
import {Headline, Subheading, TextInput} from 'react-native-paper';
import colors from '../../../../settings/colors'
import {ACTIONS} from "../../../state/State";
import {connect} from "react-redux";
import {SafeAreaView} from "react-native-safe-area-context";
import GroceryList from "./GroceryList";

export default connect((state) => {
    console.log(state.groceries)
    return {
        want: state.groceries.want,
        have: state.groceries.have
    }
}, {
    setWantGroceries: groceries => ({
        type: ACTIONS.SET_WANT_GROCERIES,
        groceries
    }),
    setHaveGroceries: groceries => ({
        type: ACTIONS.SET_HAVE_GROCERIES,
        groceries
    }),
    deleteWantGrocery: grocery => ({
        type: ACTIONS.REMOVE_WANT_GROCERY,
        grocery
    }),
    deleteHaveGrocery: grocery => ({
        type: ACTIONS.REMOVE_HAVE_GROCERY,
        grocery
    }),
    addWantGrocery: grocery => ({
        type: ACTIONS.ADD_WANT_GROCERY,
        grocery
    }),
    addHaveGrocery: grocery => ({
        type: ACTIONS.ADD_HAVE_GROCERY,
        grocery
    }),
})(Groceries)

function Groceries(props) {
    console.log(props.have, props.want)

    const listHeight = 25;

    const [addWant, setAddWant] = React.useState('')
    const [addHave, setAddHave] = React.useState('')

    return (
        <View style={{flex: 1}}>
            <SafeAreaView
                style={{backgroundColor: colors.foodblocksRed, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                    Grocery List
                </Headline>
            </SafeAreaView>
            <View style={{flex: 1 / 2}}>
                <Subheading style={{marginLeft: 15}}>WANT</Subheading>
                <GroceryList delete={props.deleteWantGrocery} height={listHeight} setData={props.setWantGroceries}
                             data={props.want}/>
                <TextInput label={'Add wanted grocery'} value={addWant} onChangeText={setAddWant}
                           onSubmitEditing={() => {
                               props.addWantGrocery(addWant)
                               setAddWant('')
                           }}/>
            </View>
            <View style={{flex: 1 / 2}}>
                <Subheading style={{marginLeft: 15}}>HAVE</Subheading>
                <GroceryList delete={props.deleteHaveGrocery} height={listHeight} setData={props.setHaveGroceries}
                             data={props.have}/>
                <TextInput label={'Add needed grocery'} value={addHave} onChangeText={setAddHave}
                           onSubmitEditing={() => {
                               props.addHaveGrocery(addHave)
                               setAddHave('')
                           }}/>
            </View>
        </View>
    );
}
