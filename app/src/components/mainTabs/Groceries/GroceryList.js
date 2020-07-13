import DraggableFlatList from 'react-native-draggable-flatlist'
import React from "react";
import {IconButton, Text} from "react-native-paper";
import {TouchableWithoutFeedback, View} from "react-native";

export default function GroceryList(props) {
    function renderItem({item, index, drag, isActive}) {
        const color = (150 - (index / props.data.length) * 75)

        return (
            <TouchableWithoutFeedback
                onLongPress={drag}
            >
                <View style={{
                    borderBottomWidth: index == props.data.length ? 0 : 1,
                    borderColor: 'white',
                    height: props.height,
                    backgroundColor: isActive ? 'rgb(0,250,83)' : `rgb(${0},${color},${100})`,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: 'row'
                }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: 20,
                            marginLeft: 20
                        }}
                    >
                        {item}
                    </Text>
                    <IconButton
                        icon="delete"
                        onPress={() => props.delete(item)}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View style={{flex:1}}>
            <DraggableFlatList
                keyExtractor={(item, index) => `draggable-item-${index}`}
                renderItem={renderItem} data={props.data} onDragEnd={({data}) => props.setData(data)}/>
        </View>
    )
}
