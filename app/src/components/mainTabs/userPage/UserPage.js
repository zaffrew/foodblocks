import React from 'react'
import {Avatar, IconButton, List, Subheading, Surface, Title} from 'react-native-paper';
import {createStackNavigator} from "@react-navigation/stack";
import Payment from "./Payment";
import Help from "./Help";
import Username from "../../login/Username";

import {connect} from 'react-redux'
import Email from "../../login/Email";

import memoizeOne from "memoize-one";
import {ACTIONS} from "../../../state/State";
import withProps from "../../../utils/withProps";
import SafeView from "../../SafeView";

const Stack = createStackNavigator();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.Username = withProps(Username, {
            onSubmit: () => {
                this.props.navigation.navigate('UserScreen')
            }
        });
        this.Email = withProps(Email, {
            onSubmit: () => {
                this.props.navigation.navigate('UserScreen')
            }
        });
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="UserScreen"
                             screenOptions={{headerTitle: null, headerBackTitleVisible: false,}}>
                <Stack.Screen options={{headerShown: false}} name="UserScreen"
                              component={(UserScreen)}/>
                <Stack.Screen name="Username" component={this.Username}/>
                <Stack.Screen name="Email" component={this.Email}/>
                <Stack.Screen name="Payment Information" component={Payment}/>
                <Stack.Screen name="Help" component={Help}/>
            </Stack.Navigator>
        )
    }
}

const UserScreen = connect((state) => {
    return {email: state.user_info.email, username: state.user_info.username}
}, {
    logout: () => ({
        type: ACTIONS.RESET,
    }),
})(class extends React.Component {
    memoizedAvatar = memoizeOne(getAvatar);

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeView bottom={false} style={{flex: 1, alignItems: 'stretch'}}>
                <Surface
                    style={{flex: 0, padding: 8, elevation: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                    {this.memoizedAvatar(this.props.username)}
                    <Title>{this.props.username}</Title>
                    <Subheading>{this.props.email}</Subheading>
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
                        {getListItem('Username', 'account', this.props.navigation)}
                        {getListItem('Email', 'email', this.props.navigation)}
                        {getListItem('Payment Information', 'currency-usd', this.props.navigation)}
                        {getListItem('Help', 'help-rhombus', this.props.navigation)}
                    </List.Section>
                    <List.Section>
                        <List.Item
                            title={"Logout"}
                            left={() => {
                                return <IconButton icon={'logout'}/>
                            }}
                            onPress={() => {
                                this.props.logout();
                                this.props.navigation.popToTop()
                            }}
                        />
                    </List.Section>
                </Surface>
            </SafeView>
        )
    }
});

function getListItem(title, iconLeft, navigator) {
    return (
        <List.Item
            title={title}
            left={() => {
                return <IconButton icon={iconLeft}/>
            }}
            right={() => {
                return <IconButton icon={'chevron-right'}/>
            }}
            onPress={() => {
                navigator.navigate(title)
            }}
        />
    )
}

function getAvatar(username) {
    if (username) {
        const initials = username.split(" ").filter(word => word.length !== 0).map(word => word[0]).reduce((sum, next) => sum + next, "");
        return <Avatar.Text label={initials.toUpperCase()}/>
    } else {
        return <Avatar.Icon icon="account"/>
    }
}
