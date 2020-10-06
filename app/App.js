import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';

import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import AppNavigator from "./src/components/AppNavigator";
import {NavigationContainer} from '@react-navigation/native';

import {persistor, store} from './src/state/State'

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

export default function App() {

    const [fontLoaded, setFontLoaded] = React.useState(false)

    React.useEffect(() => {
        if (fontLoaded) return;


        let canceled = false;

        async function effect() {
            await Font.loadAsync({
                'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
            });

            if (!canceled) {
                setFontLoaded(true);
            }
        }

        effect();

        return () => canceled = true;
    }, [])

    if (fontLoaded) {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <PaperProvider theme={theme}>
                                {/* PaperProvider also includes Portal.Host */}
                                <AppNavigator/>
                            </PaperProvider>
                        </SafeAreaProvider>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        );
    }
    return null;
}
