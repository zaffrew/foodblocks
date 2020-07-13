import {List} from "react-native-paper";
import React from "react";
import {connect} from "react-redux";


export default connect(state => {
    return {lists: state.lists}
})
(props => {
    const list = props.lists.map(list => {
        return <List.Item key={list.name} title={list.name} onPress={() => props.onPress(list.name)}
                          right={props.right && (() => props.right(list.name))}/>
    })

    return (
        <List.Section>
            {list}
        </List.Section>
    )
})
