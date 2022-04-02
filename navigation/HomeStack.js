import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../views/Home';
import SettingsScreen from '../views/Settings';
import SelectTheme from '../views/settings/SelectTheme';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
            <Stack.Screen name="Settings-SelectTheme" component={SelectTheme}/>
        </Stack.Navigator>
    );
};