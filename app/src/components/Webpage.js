import React from "react";
import {WebView} from 'react-native-webview';
import SafeView from "./SafeView";
import {Button, Dialog, Paragraph, Portal, Subheading} from "react-native-paper";
import styles from "../../settings/styles"
import {ActivityIndicator} from "react-native";
import {exp} from "react-native-reanimated";

const URL = require('url-parse');

export default class extends React.Component {

    static defaultProps = {
        uri: 'https://www.myrecipes.com/recipe/easy-peach-cobbler'
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    hideSpinner = () => {
        this.setState({loading: false})
    }

    render(props) {
        return (
            <SafeView style={{flex: 1}}>
                <WebView
                    onLoad={() => this.hideSpinner()}
                    style={{flex: 1}}
                    source={{uri: this.props.uri}}
                    onShouldStartLoadWithRequest={request => {
                        // Only allow navigating within this website
                        const expected = new URL(this.props.uri)
                        const actual = new URL(request.url)
                        return expected.hostname == actual.hostname
                    }}
                />
                {this.state.loading && (
                    <ActivityIndicator
                        size="large"
                    />
                )}
            </SafeView>
        )
    }
}
