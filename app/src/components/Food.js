import React from 'react'
import {Text, View, ScrollView, StyleSheet} from 'react-native'
import SafeView from '../components/SafeView'
import {Card, Title, List, Surface, Paragraph} from "react-native-paper";
import styles from "../../settings/styles";
import pasta from "../../assets/curry.jpg";
import colors from '../../settings/colors';

export default class Food extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
        }
    }

    render() {
        return (
            <SafeView style={styles.container}>
                <ScrollView>
                    <View>
                        <Card style={{width: 500, height: 200}}>
                        <Card.Cover style={{width: 500, height: 200}}
                                    source={pasta}/>
                        </Card>
                        <Title style={{padding: 20, fontSize: 40, textAlign:'center'}}>Curry</Title>
                    </View>
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
