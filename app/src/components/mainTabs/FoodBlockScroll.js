import React from 'react'
import {ScrollView, View} from "react-native";
import FoodBlock from "../FoodBlock";
import {connect} from "react-redux";
import getRowView from "../../utils/getRowView";

const margin = 8;

export default function FoodBlockScroll(props) {
    const blocks = props.URLs.map((URL, i) => {
        return (
            <FoodBlock margin={margin}
                       URL={URL}
                       key={i}
                       height={160}
                       onPress={props.onPress}
            />
        )
    });

    return getRowView(blocks, props.columns, ScrollView, {
        horizontal: props.horizontal,
        showsVerticalScrollIndicator: false
    })
}
