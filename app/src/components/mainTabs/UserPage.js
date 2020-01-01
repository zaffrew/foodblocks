import React from 'react'
import {AsyncStorage, View} from "react-native";
import {Avatar, IconButton, Subheading, Surface} from 'react-native-paper';
import styles from '../../../settings/styles'
import SafeView from "../SafeView";
import {List} from 'react-native-paper';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('username');

        let avatar;
        if (username) {
            const initials = username.split(" ").filter(word => word.length != 0).map(word => word[0]).reduce((sum, next) => sum += next, "");
            avatar = <Avatar.Text label={initials.toUpperCase()}/>
        } else {
            avatar = <Avatar.Icon icon="account"/>
        }

        this.setState({username, avatar})
    }

    render() {
        return (
            <SafeView style={{flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <Surface
                    style={{flex: 0, padding: 8, elevation: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                    {this.state.avatar}
                    <Subheading>{this.state.username}</Subheading>
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
                        {getListItem('Edit Username', 'account')}
                        {getListItem('Payment Information', 'currency-usd')}
                        {getListItem('Help', 'help-rhombus')}
                        {getListItem('Logout', 'logout')}
                    </List.Section>
                </Surface>

            </SafeView>
        )
    }
}


function getListItem(title, iconName) {
    return (
        <List.Item
            title={title}
            left={(props) => {
                return <IconButton icon={iconName}/>
            }}
        />
    )
}
