import {connect} from "react-redux";
import filterUnique from "../../../utils/filterUnique";
import FoodBlockScroll from "../../FoodBlockScroll";
import React from "react";
import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import colors from "../../../../settings/colors";

export default connect(state => ({
    //we do the splice so we only get up to 20 in recent history.
    food_history: filterUnique(state.user_info.food_history.slice(0, 20).map(({URL}) => URL))
}))
(props => (
        props.food_history.length > 0 ?
            <FoodBlockScroll {...props} URLs={props.food_history}/>
            :
            <View style={styles.emptyContainer} height={props.scrollLength}>
                <View style={styles.emptyLabel}>
                    <Text style={{color: colors.darkGrey}}>
                        View some foods to see them appear!
                    </Text>
                </View>
            </View>
    )
)

const styles = StyleSheet.create({
    emptyContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyLabel: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey2,
        borderRadius: 8,
        padding: 12,
        width: '80%'
    },
})