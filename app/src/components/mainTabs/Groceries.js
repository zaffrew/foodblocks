import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {TextInput, Headline, List, Colors, IconButton, Button} from 'react-native-paper';
import colors from '../../../settings/colors'
import {ACTIONS} from "../../state/State";
import {connect} from "react-redux";
import InputSpinner from "react-native-input-spinner";
import DraggableFlatList from "react-native-draggable-dynamic-flatlist";
import {SafeAreaView} from "react-native-safe-area-context";


class Groceries extends React.Component {

    state = {
        text: '',
        editMode: false,
    };

    renderGrocery({item, index, move, moveEnd}) {
        return (
            <List.Item title={item.name}
                       style={{paddingVertical: 0}}
                       left={() => {
                           return this.state.editMode ?
                               (
                                   <IconButton onPress={() => this.props.removeGrocery(index)} icon="delete"/>
                               ) :
                               (
                                   <TouchableOpacity onPressIn={move} onPressOut={moveEnd}>
                                       <IconButton icon="drag-horizontal"/>
                                   </TouchableOpacity>
                               )

                       }}
                       right={() =>
                           <InputSpinner value={item.number}
                                         onChange={(number) => this.props.setGrocery(item.name, number, index)}/>
                       }
            />
        )
    }

    submit() {
        const matchingGroceries = this.props.groceries.filter((grocery) => {
            return grocery.name === this.state.text
        });
        if (matchingGroceries.length === 0) {
            this.props.setGrocery(this.state.text, 1, this.props.groceries.length);
        }
        this.setState({text: ''})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView style={{backgroundColor: colors.foodblocksRed}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                            Grocery List
                        </Headline>
                        <Button icon="dots-horizontal" mode="contained"
                                style={{justifyContent: 'center'}}
                                onPress={() => this.setState({editMode: !this.state.editMode})}
                                color={'white'}>
                            Edit
                        </Button>
                    </View>
                    <TextInput
                        style={[{paddingVertical: 5}, {paddingHorizontal: 20}, {paddingBottom: 20}]}
                        mode='outlined'
                        placeholder='Add item'
                        value={this.state.text}
                        onChangeText={text => this.setState({text})}
                        onSubmitEditing={() => this.submit()}
                    />
                </SafeAreaView>
                <View style={{flex: 1}}>
                    <DraggableFlatList
                        data={this.props.groceries}
                        renderItem={(params) => this.renderGrocery(params)}
                        keyExtractor={(item) => `draggable-item-${item.name}`}
                        onMoveEnd={({data, from, to}) => {
                            this.props.overwriteGroceries(data)
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default connect((state) => {
    return {groceries: state.groceries}
}, {
    setGrocery: (name, number, index) => ({
        type: ACTIONS.SET_GROCERY,
        name,
        number,
        index,
    }),
    removeGrocery: (index) => ({
        type: ACTIONS.REMOVE_GROCERY,
        index
    }), overwriteGroceries: (data) => ({
        type: ACTIONS.OVERWRITE_GROCERIES,
        data
    })
})(Groceries)

