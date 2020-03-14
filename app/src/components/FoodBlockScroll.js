import React from 'react'
import {ScrollView} from "react-native";
import FoodBlock from "./FoodBlock";
import getRowView from "../utils/getRowView";

const margin = 8;

export default function FoodBlockScroll(props) {
    const blocks = props.URLs.map((URL, i) => {
        return (
            <FoodBlock margin={margin}
                       URL={URL}
                       key={URL}
                       height={160}
                       onPress={props.onPress}
            />
        )
    });

    return getRowView(blocks, props.crossAxisSize, ScrollView, {
        horizontal: props.horizontal,
        showsVerticalScrollIndicator: false
    })
}
