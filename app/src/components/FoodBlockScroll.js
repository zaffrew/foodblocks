import React from 'react'
import BlockScroll from "./BlockScroll";
import {getRecipe, getThumbnail} from "../scraper/Scraper";

/**
 *
 * @param props: {blockLength, scrollLength, horizontal, blocksPerCrossAxis, onPress}
 * if scrollLength is falsy then the scrollview will take up flex:1
 * @returns {*}
 * @constructor
 */
export default function FoodBlockScroll(props) {
    const blocks = props.URLs.map(URL => {
        return {
            onPress: () => props.onPress(URL),
            getData: async () => {
                const recipe = await getThumbnail(URL);
                return {
                    image: recipe.image,
                    title: recipe.name,
                }
            }
        }
    })

    return <BlockScroll {...props} blocks={blocks}/>
}
