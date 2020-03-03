import * as React from 'react';
import { Appbar, List, getListItem, Title, Headline, configureFonts } from 'react-native-paper';
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

export default class MyComponent extends React.Component {
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
      </SafeView>
    
    );
  }
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 25,
  },
  bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -225,
  }
});
const barData = {
    labels: ['Vitman A', 'Vitman B', 'Vitman C', 'Calories', 'Total fat', 'Iron'],
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