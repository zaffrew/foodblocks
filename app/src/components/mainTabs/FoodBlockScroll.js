import React from 'react'
import {ScrollView, View} from "react-native";
import FoodBlock from "../FoodBlock";

const margin = 8;

/**
 *
 * @param props
 * Required props: URLs, onPress, columns
 * @returns {*}
 */
export default (props) => {
    const blocks = props.data.map(({URL, img, title}, i) => {
        return (
            <FoodBlock margin={margin} key={i} image={img}
                       text={title} height={160}
                       onPress={() => {
                           props.onPress(URL)
                       }}
            />
        )
    })

    const columns = props.columns;
    const rows = Math.floor(blocks.length / columns);
    const remainder = blocks.length % columns;
    const blockViews = []
    let i = 0

    for (; i < rows; i++) {
        blockViews.push(
            <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                {blocks.slice(i * columns, (i + 1) * columns)}
            </View>
        )
    }

    if (remainder !== 0) {
        const paddingViews = []
        for (let i = 0; i < columns - remainder; i++) {
            paddingViews.push(<View key={i} style={{margin, flex: 1}}/>)
        }
        blockViews.push(
            <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                {blocks.slice(i * columns)}
                {paddingViews}
            </View>
        )
    }

    return (
        <ScrollView horizontal={props.horizontal} showsVerticalScrollIndicator={false}>
            {blockViews}
        </ScrollView>
    );
}
