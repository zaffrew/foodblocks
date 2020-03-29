import {connect} from "react-redux";
import filterUnique from "../../../utils/filterUnique";
import FoodBlockScroll from "../../FoodBlockScroll";
import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";

export default connect(state => ({
    //we do the splice so we only get up to 20 in recent history.
    food_history: filterUnique(state.user_info.food_history.slice(0, 20).map(({URL}) => URL))
}))
(props => (
        props.food_history.length > 0 ?
            <FoodBlockScroll {...props}/>
            :
            <View style={{alignItems: 'center', justifyContent: 'center'}} height={props.scrollLength}>
                <Text>
                    View some foods to see them appear!
                </Text>
            </View>
    )
)
