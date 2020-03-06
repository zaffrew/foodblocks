import {View} from "react-native";
import React from "react";

export default function getRowView(components, columns, Parent = View, parentProps) {
    const rows = Math.floor(components.length / columns);
    const remainder = components.length % columns;
    const rowViews = [];
    let i = 0;

    for (; i < rows; i++) {
        rowViews.push(
            <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                {components.slice(i * columns, (i + 1) * columns)}
            </View>
        )
    }

    if (remainder !== 0) {
        const paddingViews = [];
        for (let i = 0; i < columns - remainder; i++) {
            paddingViews.push(<View key={i} style={{flex: 1}}/>)
        }
        rowViews.push(
            <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                {components.slice(i * columns)}
                {paddingViews}
            </View>
        )
    }

    return (
        <Parent {...parentProps}>
            {rowViews}
        </Parent>
    )
}
