import {createSwitchNavigator} from "react-navigation";
import MainPage from "./MainPage";
import {createAppContainer} from "react-navigation";
import Splash from "./Splash";
import Login from "./Login";

const RootStack = createSwitchNavigator(
    {
        MainPage,
        Login,
        Splash
    },
    {
        initialRouteName: "Splash",
    });

export default createAppContainer(RootStack);
