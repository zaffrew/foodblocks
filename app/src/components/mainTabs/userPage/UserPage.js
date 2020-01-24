import React from 'react'
import {Avatar, IconButton, List, Subheading, Surface, Title} from 'react-native-paper';
import SafeView from "../../SafeView";
import {createStackNavigator} from "@react-navigation/stack";
import Payment from "./Payment";
import Help from "./Help";
import Logout from "./Logout";
import Username from "../../login/Username";

import {connect} from 'react-redux'
import withRouteParams from "../../withRouteParams";
import Email from "../../login/Email";


const Stack = createStackNavigator();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.Username = withRouteParams(Username);
        this.Email = withRouteParams(Email);
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
                <Stack.Screen name="Logout" component={Logout}/>
            </Stack.Navigator>
        )
    }
}

const UserScreen = connect((state) => ({email: state.email, username: state.username}))(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {avatar: getAvatar(props.username)}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newName = this.props.username
        if (prevProps.username != newName) {
            this.setState({avatar: getAvatar(newName)})
        }
    }

    render() {
        return (
            <SafeView style={{flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <Surface
                    style={{flex: 0, padding: 8, elevation: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                    {this.state.avatar}
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
                        {getListItem('Username', 'account', this.props.navigation, {onSubmit: () => this.props.navigation.goBack()})}
                        {getListItem('Email', 'email', this.props.navigation, {onSubmit: () => this.props.navigation.goBack()})}
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
                                this.props.navigation.navigate('Splash')
                            }}
                        />
                    </List.Section>
                </Surface>
            </SafeView>
        )
    }
})

function getListItem(title, iconLeft, navigator, props) {
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
                navigator.navigate(title, props)
            }}
        />
    )
}

function getAvatar(username) {
    let avatar;
    if (username) {
        const initials = username.split(" ").filter(word => word.length !== 0).map(word => word[0]).reduce((sum, next) => sum += next, "");
        return <Avatar.Text label={initials.toUpperCase()}/>
    } else {
        return <Avatar.Icon icon="account"/>
    }
}
