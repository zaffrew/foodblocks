import React from 'react'
import {connect} from "react-redux";
import {View} from "react-native";
import {Text} from "react-native-paper";
import BlockScroll from "../../BlockScroll";
import {getThumbnail} from "../../../scraper/Scraper";

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
        const query_with_filters = search.filters.join(' ') + ' ' + search.query;

        if (search.results.length === 0 || queries.includes(query_with_filters)) {
            continue;
        }
        queries.push(query_with_filters)

        blocks.push({
            onPress: () => {
                props.onSearchPress(query_with_filters, search.results)
            },
            getData: async () => {
                const recipe = await getThumbnail(search.results[0])
                return {
                    title: query_with_filters,
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
