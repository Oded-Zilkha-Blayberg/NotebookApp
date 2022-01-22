import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../views/Home';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    );
};