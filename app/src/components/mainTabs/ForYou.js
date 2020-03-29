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
        <BarChart
    style={styles.bottom}
    data={barData}
    width={screenWidth} // screenWidth
    height={220}
    yAxisLabel={'%'}
    chartConfig={chartConfig}
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
        <Headline>
       Calories
        </Headline>

      </SafeView>
    )
  }
}

class vitamanA extends React.Component{
  render(){
    return(
      <SafeView>
        <Headline>
       Vitman A
        </Headline>

      </SafeView>
    )
  }
}

class vitamanB extends React.Component{
  render(){
    return(
      <SafeView>
        <Headline>
       Vitman B
        </Headline>

      </SafeView>
    )
  }
}

class vitamanC extends React.Component{
  render(){
    return(
      <SafeView>
        <Headline>
       Vitman C
        </Headline>

      </SafeView>
    )
  }
}

class iron extends React.Component{
  render(){
    return(
      <SafeView>
        <Headline>
       Iron
        </Headline>

      </SafeView>
    )
  }
}

class totalFat extends React.Component{
  render(){
    return(
      <SafeView>
        <Headline>
       Total Fat
        </Headline>

      </SafeView>
    )
  }
}

const styles = StyleSheet.create({
  c: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -275,
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
    bottom: -325,
  },
  vb: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -375,
  },
  vc: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -425,
  },
  f: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -475,
  },
  i: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -525,
  }
});
const barData = {
    labels: ['Vitaman A', 'Vitaman B', 'Vitaman C', 'Calories', 'Total fat', 'Iron'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#E43938",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#E62D1B",
    backgroundGradientToOpacity: 1,
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