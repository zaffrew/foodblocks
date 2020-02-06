import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TextInput, Headline, List, Colors} from 'react-native-paper';
import colors from '../../../settings/colors'
import SafeView from '../SafeView'


export default class Groceries extends React.Component {

    state = {
        text: ''
    };

    render() {
        return (
            <View>
                <SafeView style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}> Grocery
                        List</Headline>
                    <TextInput
                        style={[{paddingVertical: 5}, {paddingHorizontal: 20}, {paddingBottom: 20}]}
                        mode='outlined'
                        placeholder='Add item'
                        value={this.state.text}
                        onChangeText={text => this.setState({text})}
                    />
                </SafeView>
                <List.Item
                    title="Milk"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Eggs"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Bread"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Chicken"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Carrots"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Apples"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Butter"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
                <List.Item
                    title="Chips"
                    style={{paddingVertical: 0}}
                    left={props => <List.Icon color={Colors.black} icon="square-outline"/>}
                    right={props => <List.Icon color={Colors.grey400} icon="menu"/>}
                />
            </View>
        );
    }
}

const listStyles = StyleSheet.create({
    listContainer: {
        flex: 2 / 4,
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingTop: 0,
        shadowOffset: {width: 0, height: 5,},
        shadowColor: 'black',
        shadowOpacity: 0.2,
    }
});

