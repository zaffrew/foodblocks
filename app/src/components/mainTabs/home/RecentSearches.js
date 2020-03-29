import React from 'react'
import {connect} from "react-redux";
import filterUnique from "../../../utils/filterUnique";
import FoodBlockScroll from "../../FoodBlockScroll";
import {View} from "react-native";
import {Text} from "react-native-paper";
import BlockScroll from "../../BlockScroll";
import {getRecipe, getThumbnail} from "../../../scraper/Scraper";
import SafeView from "../../SafeView";

const RecentSearches = props => {
    if (props.search_history.length === 0) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}} height={props.scrollLength}>
                <Text>
                    Search some foods to see them appear!
                </Text>
            </View>
        )
    }

    const blocks = []
    const queries = []

    for (let i = 0; i < props.search_history.length; i++) {
        const search = props.search_history[i]
        if (search.results.length === 0 || queries.includes(search.query)) {
            continue;
        }
        queries.push(search.query)

        blocks.push({
            onPress: () => {
                props.onSearchPress(search.query, search.results)
            },
            getData: async () => {
                const recipe = await getThumbnail(search.results[0])
                return {
                    title: search.query,
                    image: recipe.image
                }
            }
        })
    }

    return <BlockScroll {...props} blocks={blocks}/>

}

export default connect(state => ({
    //we do the splice so we only get up to 20 in recent history.
    search_history: state.user_info.search_history.slice(0, 20)
}))(RecentSearches)
