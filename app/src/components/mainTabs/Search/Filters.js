import React from 'react'
import {Text} from "react-native";
import {Chip} from "react-native-paper";
import getRowView from "../../../utils/getRowView";
import {connect} from "react-redux";
import {ACTIONS} from "../../../state/State";


function Filters(props) {
    //this should have a list of possible filters
    //when a filter is pressed it will send it to

    const filters = props.filters.map(({name, active}, i) => {
        return (
            <Chip
                key={i}
                onPress={() => props.setFilter(name, !active)}
                icon={active ? 'check' : 'border-none-variant'}
                style={{
                    backgroundColor: 'red',
                    margin: 4,
                    paddingHorizontal: 10,
                }}>
                <Text style={{color: 'white'}}>{name}</Text>
            </Chip>
        )
    });

    return getRowView(filters, 3)
}

export default connect(state => {
        return {filters: state.user_info.filters}
    }, {
        setFilter: (name, active) => ({
            type: ACTIONS.SET_FILTER,
            name, active
        })
    }
)(Filters)
