import React from 'react';
import * as eva from '@eva-design/eva';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme/theme.json';
import { default as mapping } from './mapping.json';

import Routes from './navigation/index';

const loadFonts = () => {
    return Font.loadAsync({
        'Assistant-Regular': require('./assets/fonts/Assistant-Regular.ttf'),
        'Assistant-Bold': require('./assets/fonts/Assistant-Bold.ttf'),
        'Assistant-SemiBold': require('./assets/fonts/Assistant-SemiBold.ttf'),
        'Assistant-Light': require('./assets/fonts/Assistant-Light.ttf'),
    });
};

export default () => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    if (!fontsLoaded) {
        return <AppLoading startAsync={loadFonts}
            onFinish={() => setFontsLoaded(true)} onError={console.warn} />
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
                <StatusBar style="light" />
                <Routes />
            </ApplicationProvider>
        </>
    );
};