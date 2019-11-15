import React from 'react';
import Main from "./src/components/Main";
import * as Font from 'expo-font';

export default class App extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
        });
    }
    render() {
        return (
            <Main/>
        )
    }
}