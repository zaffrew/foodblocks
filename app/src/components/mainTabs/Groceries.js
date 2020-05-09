import React, {useState} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Button, Headline, IconButton, List, TextInput} from 'react-native-paper';
import colors from '../../../settings/colors'
import {ACTIONS} from "../../state/State";
import {connect} from "react-redux";
import InputSpinner from "react-native-input-spinner";
import DraggableFlatList from "react-native-draggable-dynamic-flatlist";
import SafeView from "../SafeView";


function Groceries(props) {
    const [text, updateText] = useState('')
    const [editMode, updateEditMode] = useState(false)

    function submit() {
        const matchingGroceries = props.groceries.filter((grocery) => {
            return grocery.name === text
        });
        if (matchingGroceries.length === 0) {
            props.setGrocery(text, 1,props.groceries.length);
        }
        updateText('')
    }

    function renderGrocery({item, index, move, moveEnd}) {
        return (
            <List.Item title={item.name}
                       style={{paddingVertical: 0}}
                       left={() => {
                           return editMode ?
                               (
                                   <IconButton onPress={() => props.removeGrocery(index)} icon="delete"/>
                               ) :
                               (
                                   <TouchableOpacity onPressIn={move} onPressOut={moveEnd}>
                                       <IconButton icon="drag-horizontal"/>
                                   </TouchableOpacity>
                               )

                       }}
                       right={() =>
                           <InputSpinner value={item.number}
                                         onChange={(number) => props.setGrocery(item.name, number, index)}/>
                       }
            />
        )
    }

    return (
        <View style={{flex: 1}}>
            <SafeView bottom={false} style={{backgroundColor: colors.foodblocksRed}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                        Grocery List
                    </Headline>
                    <Button icon="dots-horizontal" mode="contained"
                            style={{justifyContent: 'center'}}
                            onPress={() => updateEditMode(!editMode)}
                            color={'white'}>
                        Edit
                    </Button>
                </View>
                <TextInput
                    style={[{paddingVertical: 5}, {paddingHorizontal: 20}, {paddingBottom: 20}]}
                    mode='outlined'
                    placeholder='Add item'
                    value={text}
                    onChangeText={text => updateText(text)}
                    onSubmitEditing={submit}
                />
            </SafeView>
            <View style={{flex: 1}}>
                <DraggableFlatList
                    data={props.groceries}
                    renderItem={(params) => renderGrocery(params)}
                    keyExtractor={(item) => `draggable-item-${item.name}`}
                    onMoveEnd={({data}) => {
                        props.overwriteGroceries(data)
                    }}
                />
            </View>
        </View>
    );
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

