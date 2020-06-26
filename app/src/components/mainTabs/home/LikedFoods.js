import {connect} from "react-redux";
import filterUnique from "../../../utils/filterUnique";
import FoodBlockScroll from "../../FoodBlockScroll";
import React from "react";
import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";
import colors from "../../../../settings/colors";

export default connect(state => ({
    liked_foods: Object.keys(state.ratings).filter(URL => state.ratings[URL] === 1)
}))
(props => (
        props.liked_foods.length > 0 ?
            <FoodBlockScroll {...props} URLs={props.liked_foods}/>
            :
            <View style={styles.emptyContainer} height={props.scrollLength}>
                <View style={styles.emptyLabel}>
                    <Text style={{color: colors.darkGrey}}>
                        Like some foods to see them appear!
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