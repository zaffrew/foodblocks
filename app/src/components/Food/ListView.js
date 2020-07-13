import {Button, IconButton, List, Modal, Portal, Surface} from "react-native-paper";
import {View} from 'react-native'
import React from "react";
import ListOfLists from "../lists/ListOfLists";
import ACTIONS from "../../state/ACTIONS";
import CreateList from "../lists/CreateList";
import {connect} from 'react-redux'

export default connect(state => ({
    lists: state.lists
}), {
    add_to_list: (URL, listName) => ({
        type: ACTIONS.ADD_TO_LIST,
        URL,
        name: listName,
    }),
})(ListView)

function ListView(props) {
    const [addListVisible, setAddListVisible] = React.useState(false);
    const [listVisible, setListVisible] = React.useState(false);

    return (
        <React.Fragment>
            <Button color={'purple'} onPress={() => setListVisible(true)}>
                Add To List
            </Button>
            <Portal>
                <Modal visible={listVisible} onDismiss={() => setListVisible(false)}>
                    <Surface>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <List.Subheader>Pick a list</List.Subheader>
                            <Button onPress={() => setAddListVisible(true)}>
                                Create new list
                            </Button>
                        </View>
                        <ListOfLists right={listName => {
                            const list = props.lists.find(({name}) => name === listName);

                            if (list === undefined) return;
                            //for some strange reason this happens sometimes when adding a list

                            const icon = list.URLs.includes(props.URL) ? 'check' : 'plus';
                            return <IconButton icon={icon}/>
                        }} onPress={name => props.add_to_list(props.URL, name)}/>
                    </Surface>
                </Modal>
                <Modal visible={addListVisible} onDismiss={() => setAddListVisible(false)}>
                    <Surface style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        paddingTop: 20,
                        borderRadius: 20,
                        elevation: 4,
                    }}>
                        <CreateList onSubmit={() => setAddListVisible(false)}/>
                    </Surface>
                </Modal>
            </Portal>
        </React.Fragment>
    )
}
