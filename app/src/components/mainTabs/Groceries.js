import React from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {TextInput, Headline, List, Colors} from 'react-native-paper';
import colors from '../../../settings/colors'
import SafeView from '../SafeView'
import {ACTIONS} from "../../state/State";
import {connect} from "react-redux";
import InputSpinner from "react-native-input-spinner";


class Groceries extends React.Component {

    state = {
        text: ''
    };

    submit() {
        const matchingGroceries = this.props.groceries.filter((grocery) => {
            return grocery.name === this.state.text
        });
        if (matchingGroceries.length === 0) {
            this.props.setGrocery(this.state.text, 1);
        }
        this.setState({text: ''})
    }

    //TODO: push a button and they both increase

    render() {
        const groceries = this.props.groceries.map((grocery, i) => {
            return (
                <List.Item key={grocery.name}
                           title={grocery.name}
                           style={{paddingVertical: 0}}
                           left={() => <List.Icon color={Colors.black} icon="square-outline"/>}
                           right={() =>
                               <InputSpinner value={grocery.number}
                                             onChange={(number) => this.props.setGrocery(grocery.name, number)}/>
                           }
                />
            )
        })

        return (
            <View style={{flex: 1}}>
                <SafeView style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}> Grocery
                        List</Headline>
                    <TextInput
                        style={[{paddingVertical: 5}, {paddingHorizontal: 20}, {paddingBottom: 20}]}
                        mode='outlined'
                        placeholder='Add item'
                        value={this.state.text}
                        onChangeText={text => this.setState({text})}
                        onSubmitEditing={() => this.submit()}
                    />
                </SafeView>
                <ScrollView>
                    {groceries}
                </ScrollView>
            </View>
        );
    }
}

export default connect((state, ownProps) => {
    return {groceries: state.groceries}
}, {
    setGrocery: (name, number) => ({
        type: ACTIONS.SET_GROCERY,
        name,
        number
    }),
})(Groceries)

