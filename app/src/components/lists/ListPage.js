import FoodBlockScroll from "../FoodBlockScroll";
import React from "react";
import {connect} from "react-redux";
import {Subheading, Title} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";

export default connect((state, props) => {
    return {
        URLs: state.lists.lists[props.list_name]
    }
})(ListPage)

function ListPage(props) {
    const mainContent = props.URLs.length > 0 ?
        <FoodBlockScroll blocksPerCrossAxis={2} blockLength={160} onPress={props.onPress} URLs={props.URLs}/> :
        <Subheading style={{alignSelf: 'center'}}>This list is empty!</Subheading>

    return (
        <SafeAreaView style={{flex: 1}}>
            <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
                {props.list_name}
            </Title>
            {mainContent}
        </SafeAreaView>
    )
}
