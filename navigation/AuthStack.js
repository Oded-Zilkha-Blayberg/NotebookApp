import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../views/Login';
import SignupScreen from '../views/Signup';

const Stack = createStackNavigator();

export default AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
};