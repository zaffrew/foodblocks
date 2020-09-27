import React from 'react'

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {Image} from 'react-native'
import homeButton from "../../assets/homeButton.png";
import forYou from "../../assets/forYou.png";
import search from "../../assets/search.png";
import groceries from "../../assets/grocceries.png";
import meals from "../../assets/plate.png";

import Search from "./mainTabs/Search/Search";
import Groceries from "./mainTabs/Groceries/Groceries";
import UserPage from "./mainTabs/userPage/UserPage";
import {withTheme} from "react-native-paper";
import Home from "./mainTabs/home/Home";
import SavedLists from "./lists/SavedLists";

const iconMap = {
    Home: homeButton,
    Search: search,
    Groceries: groceries,
    Meals: meals,
    UserPage: forYou,
    ListsPage: meals,
};

const Tab = createMaterialBottomTabNavigator();

function getImage(name, focused, color) {
    return (
        <Image source={iconMap[name]}
               style={{
                   flex: 1,
                   tintColor: color
               }}
               resizeMode='contain'/>
    );
}

function MainPage(props) {
    return (
        <Tab.Navigator barStyle={{backgroundColor: props.theme.colors.primary}}
                       initialRouteName="Home"
                       shifting={false}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: (focused, color) => {
                    return (getImage("Home", focused, color))
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
            <Tab.Screen name="Lists" component={SavedLists} options={{
                tabBarIcon: (focused, color) => {
                    return (getImage("ListsPage", focused, color))
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

export default withTheme(MainPage)
