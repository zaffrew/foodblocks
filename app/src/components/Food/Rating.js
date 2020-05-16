import {IconButton} from "react-native-paper";
import {View} from "react-native";
import React from "react";
import {ACTIONS} from "../../state/State";
import {connect} from 'react-redux'

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
            justifyContent: 'space-around',
            alignItems: 'flex-end'
        }}>
            {
                props.rating === 1 ?
                    <IconButton
                        onPress={() => {
                            props.update_rating(props.URL, 0)
                        }}
                        icon={'thumb-up'} color={'green'}/> :
                    <IconButton
                        onPress={() => {
                            props.update_rating(props.URL, 1)
                        }}
                        icon={'thumb-up-outline'}/>
            }
            {
                props.rating === -1 ?
                    <IconButton
                        onPress={() => {
                            props.update_rating(props.URL, 0)
                        }}
                        icon={'thumb-down'} color={'red'}/> :
                    <IconButton
                        onPress={() => {
                            props.update_rating(props.URL, -1)
                        }}
                        icon={'thumb-down-outline'}/>
            }
        </View>
    )
}
