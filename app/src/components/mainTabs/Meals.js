import React from 'react'
import {View} from 'react-native'
import colors from '../../../settings/colors'
import {Headline} from "react-native-paper";
import FoodBlockScroll from "../FoodBlockScroll";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import {SafeAreaView} from "react-native-safe-area-context";
import headlessNavigator from "../../utils/headlessNavigator";


const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

class Meals extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 20}, {paddingHorizontal: 10}]}>
                        Saved Meals
                    </Headline>
                </SafeAreaView>
                <FoodBlockScroll onPress={(URL) => {
                    this.props.navigation.navigate('Food', {URL})
                }}
                                 blockLength={160}
                                 blocksPerCrossAxis={2} URLs={this.props.recipes}/>
            </View>
        );
    }
}

const ConnectedMeals = connect((state) => ({recipes: state.saved_recipes}))(Meals);

export default props => headlessNavigator([
    {name: 'Meals', component: ConnectedMeals, mainPage: true},
    {name: 'Food', component: FoodWithParams}
])
