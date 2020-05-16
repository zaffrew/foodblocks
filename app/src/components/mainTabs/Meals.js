import React from 'react'
import {View} from 'react-native'
import colors from '../../../settings/colors'
import {Headline} from "react-native-paper";
import FoodBlockScroll from "../FoodBlockScroll";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food/Food";
import SafeView from "../SafeView";
import headlessNavigator from "../../utils/headlessNavigator";


const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

function Meals(props) {
    return (
        <View style={{flex: 1}}>
            <SafeView bottom={false} style={{backgroundColor: colors.foodblocksRed}}>
                <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                    My foodblocks
                </Headline>
            </SafeView>
            <FoodBlockScroll onPress={(URL) => {
                props.navigation.navigate('Food', {URL})
            }}
                             blockLength={160}
                             blocksPerCrossAxis={2} URLs={props.recipes}/>
        </View>
    );
}

const ConnectedMeals = connect((state) => ({recipes: state.saved_recipes}))(Meals);

export default headlessNavigator([
    {name: 'Meals', component: ConnectedMeals, mainPage: true},
    {name: 'Food', component: FoodWithParams}
])
