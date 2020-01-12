import React from 'react'

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';


import {Image} from 'react-native'
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
import HomeNavigator from "./HomeNavigator";
import UserPage from "./mainTabs/UserPage";

const iconMap = {
    Home: homeButton,
    ForYou: forYou,
    Search: search,
    Groceries: groceries,
    Meals: meals,
    UserPage: forYou,
};

const Tab = createMaterialBottomTabNavigator();

function getImage(name, focused, color) {
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
        <Image source={iconMap[name]}
               style={{
                   aspectRatio: 1,
                   flex: 1,
                   tintColor: color
               }}
               resizeMode='contain'/>
    );
}

export default class MainPage extends React.Component {
    render() {
        return (
            <Tab.Navigator initialRouteName="Home" shifting={false}>
                <Tab.Screen name="Home" component={HomeNavigator} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("Home", focused, color))
                    }
                }}/>
                <Tab.Screen name="ForYou" component={ForYou} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("ForYou", focused, color))
                    }
                }}/>
                <Tab.Screen name="Search" component={Search} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("Search", focused, color))
                    }
                }}/>
                <Tab.Screen name="Groceries" component={Groceries} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("Groceries", focused, color))
                    }
                }}/>
                <Tab.Screen name="Meals" component={Meals} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("Meals", focused, color))
                    }
                }}/>
                <Tab.Screen name="User" component={UserPage} options={{
                    tabBarIcon: (focused, color) => {
                        return (getImage("UserPage", focused, color))
                    }
                }}/>
            </Tab.Navigator>
        );
    }
}

/*The tab bar has flex direction row
  The individual tabs have flex direction column
  this means that when we set the image flex to 1, the images take up around 2/3 of the vertical space and the text takes up 1/3
  then based off the aspect ratio the image take up some fixed amount of horizontal space
  this means that the images take up varying amounts of horizontal space compared to each other based off their image file
  This in turn means that the actual buttons take up amounts of horizontal space that does not accurately match their visual image

  Try this, if we remove the aspect ratio parameter then touching the buttons does not accurately respond to the feedback, although thr visual does not change at all

  If you don't understand this explanation, don't mess with the aspect ratio parameter, since this took me 3 hours to understand and then fix
*/
