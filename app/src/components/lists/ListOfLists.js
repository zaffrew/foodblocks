import {List} from "react-native-paper";
import React from "react";
import {connect} from "react-redux";


export default connect(state => ({
    lists: state.lists.order
}))
(props => {
    const list = props.lists.map(name => {
        return <List.Item key={name} title={name} onPress={() => props.onPress(name)}
                          right={props.right && (() => props.right(name))}/>
    })

    return (
        <List.Section>
            {list}
        </List.Section>
    )
})
