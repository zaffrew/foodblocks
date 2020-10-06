import React from "react";
import headlessNavigator from "../utils/headlessNavigator";
import Home from "./mainTabs/home/Home";
import Search from "./mainTabs/Search/Search";
import UserPage from "./mainTabs/userPage/UserPage";
import {View} from "react-native";
import {FAB, Portal} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";


const Stack = headlessNavigator([
    {name: 'Home', component: Home, mainPage: true},
    {name: 'Search', component: Search},
    {name: 'User', component: UserPage},
])

export default function FABNavigator(props) {
    return (
        <View style={{flex: 1}}>
            <Portal>
                <SafeAreaView
                    style={{flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10}}>
                    <FAB small icon={'home'} onPress={() => props.navigation.navigate('Home')}/>
                    <FAB small icon={'magnify'} onPress={() => props.navigation.navigate('Search')}/>
                    <FAB small icon={'account'} onPress={() => props.navigation.navigate('User')}/>
                </SafeAreaView>
            </Portal>
            <Stack/>
        </View>
    )
}
