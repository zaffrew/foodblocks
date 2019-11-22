import {createStackNavigator} from "react-navigation-stack";
import MainPage from "./MainPage";
import {createAppContainer} from "react-navigation";
import Splash from "./Splash";

const RootStack = createStackNavigator(
    {
        MainPage: {
            screen: MainPage,
        },

        Splash: {
            screen: Splash,
        },
    },
    {
        initialRouteName: "Splash",
        //This removes the header from the stack navigator.
        //I dont want the header for the main menu/splash navigator
        headerMode: 'none'
    });

export default createAppContainer(RootStack);
