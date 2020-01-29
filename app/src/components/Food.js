import React from 'react'
import {Text, View, ScrollView, StyleSheet} from 'react-native'
import SafeView from '../components/SafeView'
import {Title, List, Surface, Paragraph} from "react-native-paper";
import styles from "../../settings/styles"
import pasta from "../../assets/pasta.jpg";

export default class Food extends React.Component {
    render() {
        return (
            <SafeView style={styles.container}>
                <View>
                    <Title style={{padding: 5, fontSize: 30}}>Pasta</Title>
                </View>
                <ScrollView>
                    <View style={{paddingVertical: 10}}>
                        <Title style={styles.subtitle}>Get started</Title>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding:5, fontSize: 18}}>Ingredients needed</Title>
                            <Paragraph style={{padding:5, fontSize:12}}>Ingredient 1</Paragraph>
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding:5, fontSize: 18}}>Tools needed</Title>
                            <Paragraph style={{padding:5, fontSize:12}}>Tool 1</Paragraph>
                            <Paragraph style={{padding:5, fontSize:12}}>Tool 2</Paragraph>
                            <Paragraph style={{padding:5, fontSize:12}}>Makan</Paragraph>
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding:5, fontSize: 18}}>Time needed</Title>
                            <Paragraph style={{padding:5, fontSize:12}}>30 Mins</Paragraph>
                        </Surface>
                    </View>
                    <View>
                        <Title style={[styles.subtitle, {paddingVertical: 10}]}>Steps</Title>
                        <View style={{paddingVertical: 10}}>
                            <Surface style={surfaceStyles.surface}>
                                <Paragraph style={{padding:5, fontSize:12}}>Yummly is a scam</Paragraph>
                            </Surface>
                        </View>
                    </View>
                </ScrollView>
            </SafeView>

        );
    }
}

const surfaceStyles = StyleSheet.create({
    surface: {
      padding: 20,
      elevation: 4,
    },
  });
