import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, Dimensions } from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit'
import colors from '../../../settings/colors'
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context";

class MyComponent extends React.Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.foodblocksRed}}>
      <Text  style={{padding: 5, fontSize: 50, color: "white", textAlign:'center',}}>Today</Text>
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
    <Button onPress = {() => this.props.navigation.navigate("Proteins")}
    style={styles.va}
    >
      Proteins
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("Carbs")}
    style={styles.vb}
    >
      Carbs
    </Button>
    <Button onPress = {() => this.props.navigation.navigate("Fibers")}
    style={styles.vc}
    >
      Fibers
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
    </SafeAreaView>

    );
  }
}
class Calories extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView>
        <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Calories</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Calories suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Calories: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Calories: suggested 515</Text>
      </SafeAreaView>
    )
  }
}

class Proteins extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView >
        <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Proteins</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Proteins suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Proteins: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Proteins: suggested 515</Text>

      </SafeAreaView>
    )
  }
}

class Carbs extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView>
      <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Carbs</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Carbs suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Carbs: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Carbs: suggested 515</Text>

      </SafeAreaView>
    )
  }
}

class Fibers extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView>
        <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Fibers</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Fibers suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Fibers: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Fibers: suggested 515</Text>
    </SafeAreaView>
    )
  }
}

class iron extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView>
        <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Iron</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Iron suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Iron: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Iron: suggested 515</Text>

      </SafeAreaView>
    )
  }
}

class totalFat extends React.Component{
  state = {
    breakfast: 0,
    lunch: 0,
    dinner:0
  }
  render(){
    return(
      <SafeAreaView>
      <Text style={{padding: 5, fontSize: 50, color: colors.foodblocksRed, textAlign:'center', bottom: -25}}>Total Fat</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -50}}>Breakfast: {this.state.breakfast}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -50}}>Total Fat suggested: 902</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -125}}>Lunch: {this.state.lunch}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -125}}>Total Fat: suggested 644</Text>
        <Text style={{padding: 5, fontSize: 25, color: "blue", left : 0, right: 25, bottom: -200}}>Dinner: {this.state.dinner}</Text>
        <Text style={{padding: 5, fontSize: 15, color: "grey", left : 0, right: 25, bottom: -200}}>Total Fat: suggested 515</Text>
      </SafeAreaView>
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
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Protein",
        population: 2800000,
        color: "blue",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Carbs",
        population: 527612,
        color: "green",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Fibers",
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
  return (
      <Stack.Navigator initialRouteName="MyComponent"
                       screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}>
          <Stack.Screen options={{headerShown: false}} name="MyComponent"
                        component={(MyComponent)}/>
          <Stack.Screen name="Calories" component={Calories}/>
          <Stack.Screen name="Proteins" component={Proteins}/>
          <Stack.Screen name="Carbs" component={Carbs}/>
          <Stack.Screen name="Fibers" component={Fibers}/>
          <Stack.Screen name="iron" component={iron}/>
          <Stack.Screen name="totalFat" component={totalFat}/>
      </Stack.Navigator>
  )
  }
export default statsNavigator;

