import React from 'react'
import {ScrollView, View} from "react-native";
import FoodBlock from "../FoodBlock";

const margin = 8;

export default (props) => {
    //block data is a list of data about the foods in the all recipe format
    const blocks = props.blockData.map((data, i) => {
        return (
            <FoodBlock margin={margin} key={i} image={data.img} text={data.title} height={160}
                       onPress={() => {
                           props.onPress(data)
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
