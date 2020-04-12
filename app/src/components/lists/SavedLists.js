import React from "react";
import {View} from "react-native";
import SafeView from "../SafeView";
import colors from "../../../settings/colors";
import {Headline} from "react-native-paper";
import ListOfLists from "./ListOfLists";
import headlessNavigator from "../../utils/headlessNavigator";
import withRouteParams from "../../utils/withRouteParams";
import Food from "../Food";
import ListPage from "./ListPage";
import withProps from "../../utils/withProps";

class SavedLists extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <SafeView bottom={false} style={{backgroundColor: colors.foodblocksRed}}>
                    <Headline style={[{color: 'white'}, {paddingVertical: 5}, {paddingHorizontal: 10}]}>
                        Saved Lists
                    </Headline>
                </SafeView>
                <ListOfLists onPress={name => this.props.navigation.navigate('List', {list_name: name})}/>
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
                component: withRouteParams(withProps(ListPage, {onPress: URL => props.navigation.navigate('Food', {URL})}))
            },
            {name: 'Food', component: withRouteParams(Food)},
        ])
    }

    render() {
        return <this.Navigator/>
    }

}
