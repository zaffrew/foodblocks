import {createStackNavigator} from "@react-navigation/stack";
import {Platform} from 'react-native'
import React from "react";

export default function headlessNavigator(screens) {
    const Navigator = createStackNavigator();

    const screenComponents = screens.map((screen, i) => {
        return <Navigator.Screen key={i} name={screen.name} component={screen.component} headerTitle={''}
                                 options={{
                                     headerTitle: null,
                                     headerShown: Platform.OS === 'ios' ? false : !screen.mainPage
                                 }}/>
    })

    return (
        <Navigator.Navigator>
            {screenComponents}
        </Navigator.Navigator>
    )
}
