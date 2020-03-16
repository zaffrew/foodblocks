import React from 'react'
import {ScrollView} from "react-native";
import FoodBlock from "./FoodBlock";
import getRowView from "../utils/getRowView";

const margin = 8;
const axis = 160;

/**
 *
 * @param props: {blockLength, scrollLength, horizontal, blocksPerCrossAxis, onPress}
 * if scrollLength is falsy then the scrollview will take up flex:1
 * @returns {*}
 * @constructor
 */
export default function FoodBlockScroll(props) {
    //want each foodblock to take up a certain amount of the main axis
    //want the scroll to take up a certain amount of the cross axis
    const blockSizing = {}
    const scrollSizing = {}
    if (props.horizontal) {
        blockSizing.width = props.blockLength
        scrollSizing.height = props.scrollLength
    } else {
        blockSizing.height = props.blockLength
        scrollSizing.width = props.scrollLength
    }

    const blocks = props.URLs.map((URL, i) => {
        return (
            <FoodBlock margin={margin}
                       URL={URL}
                       key={URL + '_' + i}
                       onPress={props.onPress}
                       {...blockSizing}
            />
        )
    });

    return getRowView(blocks, props.blocksPerCrossAxis, ScrollView, {
        horizontal: props.horizontal,
        style: scrollSizing,
        showsVerticalScrollIndicator: false
    })
}
