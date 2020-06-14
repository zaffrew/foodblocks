import React, {useState} from "react";
import {View} from "react-native";
import colors from "../../../settings/colors";
import {Button, Headline, Modal, Surface} from "react-native-paper";
import ListOfLists from "./ListOfLists";
import headlessNavigator from "../../utils/headlessNavigator";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food/Food";
import ListPage from "./ListPage";
import withProps from "../../utils/withProps";
import CreateList from "./CreateList";
import {SafeAreaView} from "react-native-safe-area-context";

function SavedLists(props) {
    const [addListVisible, setAddListVisible] = useState(false)

    const _showAddList = () => setAddListVisible(true)
    const _hideAddList = () => setAddListVisible(false)

    return (
        <React.Fragment>
            <SafeAreaView style={{backgroundColor: colors.foodblocksRed}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                        Saved Lists
                    </Headline>
                    <Button color={'white'} onPress={_showAddList}>
                        Add List
                    </Button>
                </View>
            </SafeAreaView>
            <ListOfLists onPress={name => props.navigation.navigate('List', {list_name: name})}/>
            <Modal visible={addListVisible} onDismiss={_hideAddList}>
                <Surface style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingTop: 20,
                    borderRadius: 20,
                    elevation: 4,
                }}>
                    <CreateList onSubmit={_hideAddList}/>
                </Surface>
            </Modal>
        </React.Fragment>
    );
}

export default function SavedListNavigator(props) {
    const Navigator = headlessNavigator([
        {name: 'SavedLists', component: SavedLists, mainPage: true},
        {
            name: 'List',
            component: withRouteParams(withProps(ListPage, {onPress: URL => props.navigation.navigate('FoodFromList', {URL})}))
        },
        {name: 'FoodFromList', component: withRouteParams(Food)},
    ])
    return <Navigator/>
}
