import React from 'react'
import {View} from 'react-native'
import colors from '../../../settings/colors'
import {Headline} from "react-native-paper";
import FoodBlockScroll from "../FoodBlockScroll";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import SafeView from "../SafeView";


const Navigator = createStackNavigator();
const FoodWithParams = withRouteParams(Food);

class Meals extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <SafeView bottom={false} style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                        Saved Meals
                    </Headline>
                </SafeView>
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

export default class MealNavigator extends React.Component {
    render() {
        return (
            <Navigator.Navigator headerMode={'none'} initialRouteName="Meals">
                <Navigator.Screen name="Meals" component={ConnectedMeals}/>
                <Navigator.Screen name="Food" component={FoodWithParams}/>
            </Navigator.Navigator>
        )
    }
}
