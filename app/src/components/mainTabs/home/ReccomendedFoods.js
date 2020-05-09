import React, {useState, useEffect} from 'react'
import FoodBlockScroll from "../../FoodBlockScroll";
import * as Scraper from '../../../scraper/Scraper'
import getActiveFilters from "../../../utils/getActiveFilters";

export default function ReccomendedFoods(props) {

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
