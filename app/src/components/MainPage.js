import React from 'react'
import {createBottomTabNavigator} from "react-navigation-tabs";

import {Image} from 'react-native'

import styles from "../../settings/styles"
import homeButton from "../../assets/homeButton.png";
import forYou from "../../assets/forYou.png";
import search from "../../assets/search.png";
import groceries from "../../assets/grocceries.png";
import meals from "../../assets/plate.png";

import Home from "./mainTabs/Home";
import ForYou from "./mainTabs/ForYou";
import Search from "./mainTabs/Search";
import Groceries from "./mainTabs/Groceries";
import Meals from "./mainTabs/Meals";

import colors from "../../settings/colors";

const primaryColor = colors.foodblocksRed;
const secondaryColor = 'white';

const iconMap = {
    Home: homeButton,
    ForYou: forYou,
    Search: search,
    Groceries: groceries,
    Meals: meals,
};

export default createBottomTabNavigator(
    {
        Home: Home,
        ForYou: ForYou,
        Search: Search,
        Groceries: Groceries,
        Meals: Meals,

    }, {
        initialRouteName: "Home",
        tabBarOptions: {
            //we already handle the safe insert in App.js
            safeAreaInset: {bottom: 'never', top: 'never'},

            activeBackgroundColor: secondaryColor,
            inactiveBackgroundColor: primaryColor,

            inactiveTintColor: secondaryColor,
            activeTintColor: primaryColor,

            //style of the label text
            labelStyle: styles.tabBar,

            //style of a specific tab
            tabStyle: {
                paddingTop: 5,
            },

            style: {
                backgroundColor: primaryColor,
            }
        },
        defaultNavigationOptions: ({navigation}) => {
            return {
                tabBarIcon: ({focused}) => {
                    /*The tab bar has flex direction row
                    The individual tabs have flex direction column
                    this means that when we set the image flex to 1, the images take up around 2/3 of the vertical space and the text takes up 1/3
                    then based off the aspect ratio the image take up some fixed amount of horizontal space
                    this means that the images take up varying amounts of horizontal space compared to each other based off their image file
                    This in turn means that the actual buttons take up amounts of horizontal space that does not accurately match their visual image

                    Try this, if we remove the aspect ratio parameter then touching the buttons does not accurately respond to the feedback, although thr visual does not change at all

                    If you don't understand this explanation, don't mess with the aspect ratio parameter, since this took me 3 hours to understand and then fix
                    */
                    return (
                        <Image source={iconMap[navigation.state.routeName]}
                               style={{
                                   aspectRatio: 1,
                                   flex: 1,
                                   tintColor: focused ? primaryColor : secondaryColor
                               }}
                               resizeMode='contain'/>
                    );
                }
            }
        }
    }
);
