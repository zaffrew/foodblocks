import {List} from "react-native-paper";
import React from "react";
import {connect} from "react-redux";


export default connect(state => {
    return {lists: state.lists}
})
(props => {
    const list = props.lists.map((list, i) => {
        return <List.Item key={i} title={list.name} onPress={() => props.onPress(list.name)}/>
    })

    return (
        <List.Section>
            {list}
        </List.Section>
    )
})
