import React from 'react'
import {View, ScrollView, StyleSheet, Image} from 'react-native'
import SafeView from '../components/SafeView'
import {Card, Title, Surface, Paragraph} from "react-native-paper";
import styles from "../../settings/styles";

export default class Food extends React.Component {
    render() {
        const ingredients = this.props.ingredients.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>)

        const directions = this.props.directions.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>)

        return (
            <SafeView style={{flex: 1}}>
                <ScrollView>
                    <Card style={{height: 300}}>
                        <Image style={{flex: 1, resizeMode: 'stretch'}} source={{uri: this.props.img}}/>
                    </Card>
                    <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>{this.props.title}</Title>
                    <View style={{paddingVertical: 10}}>
                        <Title style={styles.subtitle}>Get started</Title>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Ingredients needed</Title>
                            {ingredients}
                        </Surface>
                    </View>
                    {/*<View style={{paddingVertical: 10}}>*/}
                    {/*    <Surface style={surfaceStyles.surface}>*/}
                    {/*        <Title style={{padding: 5, fontSize: 18}}>Tools needed</Title>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 1</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 2</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Makan</Paragraph>*/}
                    {/*    </Surface>*/}
                    {/*</View>*/}
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Time needed</Title>
                            {this.props.prepTime && <Paragraph style={{padding: 5, fontSize: 12}}>Prep
                                Time: {this.props.prepTime.asMinutes()}M</Paragraph>}
                            {this.props.cookTime && <Paragraph style={{padding: 5, fontSize: 12}}>Cook
                                Time: {this.props.cookTime.asMinutes()}M</Paragraph>}
                            {this.props.totalTime && <Paragraph style={{padding: 5, fontSize: 12}}>Total
                                Time: {this.props.totalTime.asMinutes()}M</Paragraph>}
                        </Surface>
                    </View>
                    <View>
                        <Title style={[styles.subtitle, {paddingVertical: 10}]}>Steps</Title>
                        <View style={{paddingVertical: 10}}>
                            <Surface style={surfaceStyles.surface}>
                                {directions}
                            </Surface>
                        </View>
                    </View>
                </ScrollView>
            </SafeView>
        )
    }
}

const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 20,
        elevation: 4,
    },
});
