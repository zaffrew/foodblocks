import React from 'react'
import {ScrollView, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../withRouteParams";
import Food from "../Food";
import withProps from "../withProps";
import FoodBlock from "../FoodBlock";

const FoodStack = createStackNavigator();

const FoodWithProps = withRouteParams(Food);

const FoodNavigator = (props) => {
    return (
        <FoodStack.Navigator headerMode={"none"} initialRouteName="Scroll">
            <FoodStack.Screen name="Scroll" component={withProps(FoodBlockScroll, props)}/>
            <FoodStack.Screen name="Food" component={FoodWithProps}/>
        </FoodStack.Navigator>
    )
}

const FoodBlockScroll = (props) => {
    //block data is a list of data about the foods in the all recipe format
    const blocks = props.blockData.map((data) => {
        return (
            <FoodBlock image={data.img} text={data.title} height={160} width={160} textSize={16}
                       onPress={() => {
                           props.navigation.navigate("Food", {...data});
                       }}
            />
        )
    })

    const blockViews = []

    for (let i = 0; i < blocks.length - 1; i += 2) {
        blockViews.push(
            <View key={i} style={{flexDirection: 'row', justifyContent: 'center'}}>
                {blocks[i]}
                {blocks[i + 1]}
            </View>
        )
    }

    if (blocks.length % 2 == 1) {
        blocks.push(<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {blocks[blocks.length - 1]}
        </View>)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {blockViews}
        </ScrollView>
    );
}


export default FoodNavigator;
