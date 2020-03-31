import * as React from 'react';
import { Appbar, List, getListItem, Title, Headline, configureFonts, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import SafeView from '../SafeView'
import colors from '../../../settings/colors'
import {createStackNavigator} from "@react-navigation/stack";

class MyComponent extends React.Component {
  render() {
    return (
        <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Today</Text>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfigCircle}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
    <Button onPress = {() => this.props.navigation.navigate("Calories")}
    style={styles.c}
    >
      Calories
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("vitamanA")}
    style={styles.va}
    >
      Vitman A
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("vitamanB")}
    style={styles.vb}
    >
      Vitman B
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("vitamanC")}
    style={styles.vc}
    >
      Vitman C
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("totalFat")}
    style={styles.f}
    >
      Total fat
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("iron")}
    style={styles.i}
    >
      Iron
    </Button>
      </SafeView>
    
    );
  }
}
class Calories extends React.Component{
  render(){
    return(
      <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Calories</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

class vitamanA extends React.Component{
  render(){
    return(
      <SafeView >
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Vitaman A</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

class vitamanB extends React.Component{
  render(){
    return(
      <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Vitaman B</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

class vitamanC extends React.Component{
  render(){
    return(
      <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Vitaman C</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

class iron extends React.Component{
  render(){
    return(
      <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Iron</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

class totalFat extends React.Component{
  render(){
    return(
      <SafeView>
        <Text  style={{padding: 5, fontSize: 50, color: "#E62D1B", textAlign:'center',}}>Total Fat</Text>
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfigBar}
    /> 

      </SafeView>
    )
  }
}

const styles = StyleSheet.create({
  c: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
  },
  bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -225,
  },
  va: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -100,
  },
  vb: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -150,
  },
  vc: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -200,
  },
  f: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -250,
  },
  i: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -300,
  }
});
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
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Vitaman A",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Vitaman B",
      population: 527612,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Vitamin C",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Total Fat",
      population: 2500000,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Iron",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
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
  return (
      <Stack.Navigator initialRouteName="MyComponent"
                       screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}>
          <Stack.Screen options={{headerShown: false}} name="MyComponent"
                        component={(MyComponent)}/>
          <Stack.Screen name="Calories" component={Calories}/>
          <Stack.Screen name="vitamanA" component={vitamanA}/>
          <Stack.Screen name="vitamanB" component={vitamanB}/>
          <Stack.Screen name="vitamanC" component={vitamanC}/>
          <Stack.Screen name="iron" component={iron}/>
          <Stack.Screen name="totalFat" component={totalFat}/>
      </Stack.Navigator>
  )
  }
  export default statsNavigator;