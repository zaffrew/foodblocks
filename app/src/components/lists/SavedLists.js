import React from "react";
import {View} from "react-native";
import SafeView from "../SafeView";
import colors from "../../../settings/colors";
import {Button, Headline, Modal, Surface} from "react-native-paper";
import ListOfLists from "./ListOfLists";
import headlessNavigator from "../../utils/headlessNavigator";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import ListPage from "./ListPage";
import withProps from "../../utils/withProps";
import CreateList from "./CreateList";

class SavedLists extends React.Component {
    state = {
        addListVisible: false
    }

    _showAddList = () => this.setState({addListVisible: true})
    _hideAddList = () => this.setState({addListVisible: false})


    render() {
        return (
            <View style={{flex: 1}}>
                <SafeView bottom={false} style={{backgroundColor: colors.foodblocksRed}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                            Saved Lists
                        </Headline>
                        <Button color={'white'} onPress={this._showAddList}>
                            Add List
                        </Button>
                    </View>
                </SafeView>
                <ListOfLists onPress={name => this.props.navigation.navigate('List', {list_name: name})}/>
                <Modal visible={this.state.addListVisible} onDismiss={this._hideAddList}>
                    <Surface style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        paddingTop: 20,
                        borderRadius: 20,
                        elevation: 4,
                    }}>
                        <CreateList onSubmit={this._hideAddList}/>
                    </Surface>
                </Modal>
            </View>
        );
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.Navigator = headlessNavigator([
            {name: 'SavedLists', component: SavedLists, mainPage: true},
            {
                name: 'List',
                component: withRouteParams(withProps(ListPage, {onPress: URL => props.navigation.navigate('FoodFromList', {URL})}))
            },
            {name: 'FoodFromList', component: withRouteParams(Food)},
        ])
    }

    render() {
        return <this.Navigator/>
    }

}
