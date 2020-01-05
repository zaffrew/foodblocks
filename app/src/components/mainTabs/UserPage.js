import React from 'react'
import {Avatar, IconButton, Subheading, Surface} from 'react-native-paper';
import SafeView from "../SafeView";
import {List} from 'react-native-paper';
import {createStackNavigator} from "@react-navigation/stack";
import Payment from "./userPageOptions/Payment";
import Help from "./userPageOptions/Help";
import Logout from "./userPageOptions/Logout";
import Username from "../Username";

import {connect} from 'react-redux'


const Stack = createStackNavigator();

export default class UserPage extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="UserScreen">
                <Stack.Screen options={{headerShown: false}} name="UserScreen"
                              component={connect((state) => ({username: state.username}))(UserScreen)}/>
                <Stack.Screen name="Edit Username" component={Username}/>
                <Stack.Screen name="Payment Information" component={Payment}/>
                <Stack.Screen name="Help" component={Help}/>
                <Stack.Screen name="Logout" component={Logout}/>
            </Stack.Navigator>
        )
    }
}

class UserScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {avatar: this.getAvatar()}
    }

    componentDidUpdate() {
        this.setState({avatar: this.getAvatar()})
    }

    getAvatar() {
        let avatar;
        if (this.props.username) {
            const initials = this.props.username.split(" ").filter(word => word.length !== 0).map(word => word[0]).reduce((sum, next) => sum += next, "");
            return <Avatar.Text label={initials.toUpperCase()}/>
        } else {
            return <Avatar.Icon icon="account"/>
        }
    }

    render() {
        return (
            <SafeView style={{flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <Surface
                    style={{flex: 0, padding: 8, elevation: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                    {this.state.avatar}
                    <Subheading>{this.props.username}</Subheading>
                </Surface>
                <Surface
                    style={{
                        flex: 0,
                        padding: 8,
                        elevation: 4,
                        alignItems: 'stretch',
                        justifyContent: 'flex-start'
                    }}>
                    <List.Section>
                        {getListItem('Edit Username', 'account', this.props.navigation, {onSubmit: () => this.props.navigation.goBack()})}
                        {getListItem('Payment Information', 'currency-usd', this.props.navigation)}
                        {getListItem('Help', 'help-rhombus', this.props.navigation)}
                        {getListItem('Logout', 'logout', this.props.navigation)}
                    </List.Section>
                </Surface>
            </SafeView>
        )
    }
}


function getListItem(title, iconName, navigator, props) {
    return (
        <List.Item
            title={title}
            left={() => {
                return <IconButton icon={iconName}/>
            }}
            right={() => {
                return <IconButton icon={'chevron-right'}/>
            }}
            onPress={() => {
                navigator.navigate(title, props)
            }}
        />
    )
}
