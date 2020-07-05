import DraggableFlatList from 'react-native-draggable-flatlist'
import React from "react";
import {Text} from "react-native-paper";
import {TouchableWithoutFeedback, View} from "react-native";

export default function GroceryList(props) {
    function renderItem({item, index, drag, isActive}) {
        const color = (150 - (index / props.data.length) * 75)

        return (
            <TouchableWithoutFeedback
                onLongPress={() => {
                    drag()
                }}
            >
                <View style={{
                    borderBottomWidth: index == props.data.length ? 0 : 1,
                    borderColor: 'white',
                    height: 50,
                    backgroundColor: isActive ? 'rgb(0, 250, 100)':`rgb(${0},${color},${100})`,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: 32
                        }}
                    >
                        {item}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return <DraggableFlatList
        keyExtractor={(item, index) => `draggable-item-${index}`}
        renderItem={renderItem} data={props.data} onDragEnd={({data}) => props.setData(data)}/>
}
