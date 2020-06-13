import {connect} from "react-redux";
import filterUnique from "../../../utils/filterUnique";
import FoodBlockScroll from "../../FoodBlockScroll";
import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";

export default connect(state => ({
    liked_foods: Object.keys(state.ratings).filter(URL => state.ratings[URL] === 1)
}))
(props => (
        props.liked_foods.length > 0 ?
            <FoodBlockScroll {...props} URLs={props.liked_foods}/>
            :
            <View style={{alignItems: 'center', justifyContent: 'center'}} height={props.scrollLength}>
                <Text>
                    Like some foods to see them appear!
                </Text>
            </View>
    )
)
