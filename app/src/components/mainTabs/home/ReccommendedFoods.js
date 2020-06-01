import React, {useEffect, useState} from 'react'
import FoodBlockScroll from "../../FoodBlockScroll";
import * as Scraper from '../../../scraper/Scraper'
import getActiveFilters from "../../../utils/getActiveFilters";

export default function ReccommendedFoods(props) {

    //TODO: never show the user foods that they have disliked here, and in the search, or lower the search ranking

    const [URLs, updateURLs] = useState([])

    useEffect(() => {
        async function effect() {
            const searchRes = await Scraper.getSearch(props.foodName, getActiveFilters())
            updateURLs(searchRes.results)
        }

        effect();
    }, [props.foodName]);

    return (
        <FoodBlockScroll {...props} URLs={URLs}/>
    )
}
