import {ScrollView, StyleSheet, View} from "react-native";
import {Avatar, Button, Surface, Text, Title} from "react-native-paper";
import colors from "../../../settings/colors";
import styles from '../../../settings/styles'
import {textStyles} from '../../../styles/styles'
import React from "react";
import {capitalizeFirstLetter} from "../../utils/StringUtils";
import moment from "moment";

export default function RecipeInfo(props) {

    const ingredients = props.recipe.ingredients.map((text, i) =>
        <View key={i} style={(i % 2 === 0) ? bodyStyle.even : bodyStyle.odd}>
            <Text style={textStyles.body}>{text}</Text>
        </View>
    );

    const directions = props.recipe.directions.map((text, i) =>
        <View key={i} style={[(i % 2 === 0) ? bodyStyle.even : bodyStyle.odd, {flexDirection: 'row'}]}>
            <Text style={[textStyles.body, {paddingHorizontal: 5, fontSize: 16}]}>{i + 1}</Text>
            <Text style={[textStyles.body, {flex: 1, flexShrink: 1}]}>{text}</Text>
        </View>
    );

    const timing = [];
    Object.keys(props.recipe.time).forEach((key, i) => {
        const value = props.recipe.time[key];
        if (value) {
            timing.push(
                <View key={i} style={{padding: 10}}>
                    <Avatar.Text size={40} labelStyle={{fontSize: 14}} label={moment.duration(value).asMinutes()}/>
                    <Text style={{
                        textAlignVertical: 'center',
                        paddingVertical: 5
                    }}>{capitalizeFirstLetter(key)}</Text>
                </View>)
        }
    });

    return (
        // <View style={{flexWrap: 'wrap'}}>
        <Surface style={styles.surface}>
            <Button color={colors.foodblocksRed} icon='close' onPress={props.onDismiss}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title style={textStyles.title}>{props.recipe.name}</Title>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={[textStyles.sub, {color: 'grey'}]}>{props.recipe.source.toUpperCase()}
                    </Text>
                </View>
                {props.addFoodblockButton}
                <View>
                    <Text style={[textStyles.sub, {textAlign: 'center'}]}>
                        Recipe by {props.recipe.author}
                    </Text>
                    <View style={{padding: 5, backgroundColor: colors.lightYellow, borderRadius: 10}}>
                        <Text style={[textStyles.sub, {
                            textAlign: 'center', color: colors.darkYellow,
                        }]}>
                            {props.recipe.description}
                        </Text>
                    </View>

                    <Title style={textStyles.heading}>Ingredients Required</Title>
                    {ingredients}
                    <View>
                        <Title style={textStyles.heading}>Time needed</Title>
                        <View style={{flexDirection: 'row'}}>
                            {timing}
                        </View>
                    </View>
                    <Title style={textStyles.heading}>Directions</Title>
                    {directions}
                </View>
            </ScrollView>
        </Surface>
        // </View>
    )
}

const bodyStyle = StyleSheet.create({
    odd: {
        backgroundColor: '#ffffff',
        padding: 4,
        flex: 1,
    },
    even: {
        backgroundColor: colors.lightGrey2,
        padding: 4,
        flex: 1,
    }
});

