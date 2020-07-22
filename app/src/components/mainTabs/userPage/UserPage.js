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
import headlessNavigator from "../../../utils/headlessNavigator";
import {SafeAreaView} from "react-native-safe-area-context";

export default function UserPage(props) {
    const this_Username = withProps(Username, {
        onSubmit: () => {
            props.navigation.navigate('UserScreen')
        }
    });
    const this_Email = withProps(Email, {
        onSubmit: () => {
            props.navigation.navigate('UserScreen')
        }
    });

    const HeadlessNavigator = headlessNavigator([
        {name: 'UserScreen', component: UserScreen, mainPage: true},
        {name: 'Username', component: this_Username},
        {name: 'Email', component: this_Email},
        {name: 'Help', component: Help},
        {name: 'Payment Information', component: Payment}
    ])

    return <HeadlessNavigator/>
}

const UserScreen = connect((state) => {
    return {email: state.user_info.email, username: state.user_info.username}
}, {
    logout: () => ({
        type: ACTIONS.RESET,
    }),
})(function (props) {
    const memoizedAvatar = memoizeOne(getAvatar);

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'stretch'}}>
            <Surface
                style={{flex: 0, padding: 8, elevation: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                {memoizedAvatar(props.username)}
                <Title>{props.username}</Title>
                <Subheading>{props.email}</Subheading>
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
                    {getListItem('Username', 'account', props.navigation)}
                    {getListItem('Email', 'email', props.navigation)}
                    {getListItem('Payment Information', 'currency-usd', props.navigation)}
                    {getListItem('Help', 'help-rhombus', props.navigation)}
                </List.Section>
                <List.Section>
                    <List.Item
                        title={"Logout"}
                        left={() => {
                            return <IconButton icon={'logout'}/>
                        }}
                        onPress={() => {
                            props.logout();
                            props.navigation.popToTop()
                        }}
                    />
                </List.Section>
            </Surface>
        </SafeAreaView>
    )
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
