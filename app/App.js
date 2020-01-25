import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import {Provider} from 'react-redux'
import {createStore} from 'redux'


import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import AppNavigator from "./src/components/AppNavigator";
import {NavigationNativeContainer} from "@react-navigation/native";

const fontWeights = {
    Thin: '100',
    UltraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    Semibold: '600',
    Bold: '700',
    Heavy: '800',
    Black: '900',
};

//TODO: android has a problem with fonts that are certain weights other than normal

const platformFontConfig = {
    regular: {
        fontFamily: 'montserrat',
        fontWeight: 'normal',
    },
    medium: {
        fontFamily: 'montserrat',
        fontWeight: 'normal',
    },
    light: {
        fontFamily: 'montserrat',
        fontWeight: 'normal',
    },
    thin: {
        fontFamily: 'montserrat',
        fontWeight: 'normal',
    },
};

const fontConfig = {
    ios: platformFontConfig,
    android: platformFontConfig,
    default: platformFontConfig,
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
            fontLoaded: false,
        }
    }

    async loadSplashFont() {
        await Font.loadAsync({
            'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
        });
    }

    componentDidMount() {
        this.loadSplashFont().then(() => this.setState({fontLoaded: true}))
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <Provider store={createStore(reducer)}>
                    <NavigationNativeContainer>
                        <SafeAreaProvider>
                            <PaperProvider theme={theme}>
                                <AppNavigator/>
                            </PaperProvider>
                        </SafeAreaProvider>
                    </NavigationNativeContainer>
                </Provider>
            );
        }
        return null;
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'USERNAME':
            return {...state, username: action.username};
        case 'EMAIL':
            return {...state, email: action.email};
        default:
            return state
    }
}
