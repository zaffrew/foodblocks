import {FAB} from "react-native-paper";
import {View} from "react-native";
import React from "react";
import {ACTIONS} from "../../state/State";
import {connect} from 'react-redux'
import colors from '../../../settings/colors';


export default connect((state, props) => {
    let rating = state.ratings[props.URL] || 0
    return {rating}
}, {
    update_rating: (URL, rating) => ({
        type: ACTIONS.SET_RATING,
        URL,
        rating
    })
})(Rating)

function Rating(props) {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: 10
        }}>
            {
                props.rating === 1 ?
                    <FAB
                        style={{backgroundColor: 'white'}}
                        onPress={() => {
                            props.update_rating(props.URL, 0)
                        }}
                        icon={'thumb-up'} color={'green'}/> :
                    <FAB
                        style={{backgroundColor: colors.foodblocksRed}}
                        onPress={() => {
                            props.update_rating(props.URL, 1)
                        }}
                        icon={'thumb-up'}/>
            }
            {
                props.rating === -1 ?
                    <FAB
                        style={{backgroundColor: 'white'}}
                        onPress={() => {
                            props.update_rating(props.URL, 0)
                        }}
                        icon={'thumb-down'} color={'red'}/> :
                    <FAB
                        style={{backgroundColor: colors.foodblocksRed}}
                        onPress={() => {
                            props.update_rating(props.URL, -1)
                        }}
                        icon={'thumb-down'}/>
            }
        </View>
    )
}
