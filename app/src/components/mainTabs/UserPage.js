import React from 'react'
import {AsyncStorage, View} from "react-native";
import {Avatar, Subheading} from 'react-native-paper';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('username');

        let avatar
        if (username) {
            const initials = username.split(" ").filter(word => word.length != 0).map(word => word[0]).reduce((sum, next) => sum += next, "")
            avatar = <Avatar.Text label={initials.toUpperCase()}/>
        } else {
            avatar = <Avatar.Icon icon="account"/>
        }

        this.setState({username, avatar})
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {this.state.avatar}
                <Subheading>{this.state.username}</Subheading>
            </View>
        )
    }
}
