import React from 'react';
//import Main from "./src/components/Main";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import styles from './src/components/styles.js';
import * as Font from 'expo-font';
import SplashScreen from "./src/components/splash.js";
import Home from './src/components/home.js';

const splashTransitionTime = 2000;
const username = "Vedant";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: username,
            screen: "splash",
            fontLoaded: false
        }
    }

    async componentDidMount() {

        await Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        })
        this.setState({ fontLoaded: true });

        setTimeout(()=> {
            this.setState({
                username: this.state.username,
                screen: 'home'
            })
        }, splashTransitionTime)

    }

    render() {
        if (this.state.fontLoaded) {
            if (this.state.screen === 'splash') {
                return (
                    <SplashScreen name = {this.state.username}/>
                );
            } else if (this.state.screen === 'home') {
                return (
                  <Home/>
                );
            }
        }
        return null;
    }

}
