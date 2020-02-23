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
import UserPage from "./mainTabs/userPage/UserPage";
import {withTheme} from "react-native-paper";

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
    return (
        <Image source={iconMap[name]}
               style={{
                   flex: 1,
                   tintColor: color
               }}
               resizeMode='contain'/>
    );
}

class MainPage extends React.Component {
    render() {
        return (
            <Tab.Navigator barStyle={{backgroundColor: this.props.theme.colors.primary}}
                           initialRouteName="Search"
                           shifting={false}>
                {/*<Tab.Screen name="Home" component={HomeNavigator} options={{*/}
                {/*    tabBarIcon: (focused, color) => {*/}
                {/*        return (getImage("Home", focused, color))*/}
                {/*    }*/}
                {/*}}/>*/}
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

export default withTheme(MainPage)
