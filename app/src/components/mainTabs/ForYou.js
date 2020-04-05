import React from 'react';
import {View} from 'react-native'
import {Button} from 'react-native-paper';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit'
import SafeView from '../SafeView'
import colors from '../../../settings/colors'
import {createStackNavigator} from "@react-navigation/stack";

const categories = [
    'Calories',
    'Vitamin A',
    'Vitamin B',
    'Vitamin C',
    'Total Fat',
    'Iron'
]

class MyComponent extends React.Component {
    render() {
        const buttons = categories.map((name, i) =>
            <Button key={i} onPress={() => this.props.navigation.navigate(name)}>
                {name.toUpperCase()}
            </Button>
        )

        return (
            <View style={{flex: 1}}>
                <SafeView style={{backgroundColor: colors.foodblocksRed}}>
                    <Text style={{padding: 5, fontSize: 50, color: "white", textAlign: 'center',}}>
                        Today
                    </Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfigCircle}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft={15}
                    />
                </SafeView>
                <View style={{flex: 1, justifyContent: 'space-around'}}>
                    {buttons}
                </View>
            </View>
        );
    }
}

function getPage(name) {
    return () => (
        <SafeView>
            <Text style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign: 'center',}}>{name}</Text>
            <BarChart
                data={barData}
                width={screenWidth} // screenWidth
                height={220}
                yAxisLabel={''}
                chartConfig={chartConfigBar}
            />
        </SafeView>
    )

}

const barData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43, 25],
        },
    ],
};

const chartConfigBar = {
    backgroundGradientFrom: "#E43938",
    backgroundGradientFromOpacity: 0.9,
    backgroundGradientTo: "#E62D1B",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(25, 125, 425, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
};

const data = [
    {
        name: "Calories",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Vitaman A",
        population: 2800000,
        color: "blue",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Vitaman B",
        population: 527612,
        color: "green",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Vitamin C",
        population: 8538000,
        color: "orange",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Total Fat",
        population: 2500000,
        color: "yellow",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Iron",
        population: 11920000,
        color: "purple",
        legendFontColor: "white",
        legendFontSize: 12
    }
];
const chartConfigCircle = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};

const screenWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();
const statsNavigator = (props) => {
    const screens = categories.map((name, i) => <Stack.Screen key={i} name={name} component={getPage(name)}/>)

    return (
        <Stack.Navigator initialRouteName="MyComponent"
                         screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}>
            <Stack.Screen options={{headerShown: false}} name="MyComponent"
                          component={(MyComponent)}/>
            {screens}
        </Stack.Navigator>
    )
}
export default statsNavigator;
