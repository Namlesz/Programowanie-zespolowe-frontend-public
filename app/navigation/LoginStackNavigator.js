import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../views/Login';
import LoginEmailScreen from '../views/LoginEmail';
import RegisterScreen from '../views/Register';
import PasswordResetScreen from '../forms/PasswordReset';
import LoadingScreen from '../views/Loading';

const Stack = createStackNavigator();

const LoginStackNavigator = () => (
    <>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="LoginEmail"
                component={LoginEmailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DrawerNav"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordReset"
                component={PasswordResetScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Loading"
                component={LoadingScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </>
);
export default LoginStackNavigator;
