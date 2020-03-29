import React from 'react'
import getRowView from "../utils/getRowView";
import Block from "./Block";
import {ScrollView} from "react-native";

const margin = 8;
const axis = 160;

/**
 *
 * @param props: {blockLength, scrollLength, horizontal, blocksPerCrossAxis, blocks}
 * if scrollLength is falsy then the scrollview will take up flex:1
 * @returns {*}
 * @constructor
 */
export default function BlockScroll(props) {
    //want each block to take up a certain amount of the main axis
    //want the scroll to take up a certain amount of the cross axis
    const blockSizing = {};
    const scrollSizing = {};
    if (props.horizontal) {
        blockSizing.width = props.blockLength;
        scrollSizing.height = props.scrollLength
    } else {
        blockSizing.height = props.blockLength;
        scrollSizing.width = props.scrollLength
    }

    const blocks = props.blocks.map((block, i) => {
        return (
            <Block margin={margin}
                   key={i}
                   onPress={block.onPress}
                   getData={block.getData}
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
