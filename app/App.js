import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font';

import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import AppNavigator from "./src/components/AppNavigator";

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'montserrat',
            fontWeight: 'regular',
        },
        medium: {
            fontFamily: 'montserrat',
            fontWeight: 'medium',
        },
        light: {
            fontFamily: 'montserrat',
            fontWeight: 'light',
        },
        thin: {
            fontFamily: 'montserrat',
            fontWeight: 'thin',
        },
    },
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#D32240',
        accent: '#891425',
        background: 'white',
    },
    fonts: configureFonts(fontConfig),
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
    }

    async loadSplashFont() {
        await Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        });
        this.setState({fontLoaded: true});
    }

    componentDidMount() {
        this.loadSplashFont()
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <PaperProvider theme={theme}>
                    <SafeAreaProvider>
                        <AppNavigator/>
                    </SafeAreaProvider>
                </PaperProvider>
            );
        }
        return null;
    }
}
