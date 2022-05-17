import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import FlashMessage from 'react-native-flash-message';
import useFonts from './app/utils/useFonts';
import LoginStackNavigator from './app/navigation/LoginStackNavigator';
import store from './app/utils/store';
import { Provider } from 'react-redux';
import {StatusBar} from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import storage from '@react-native-async-storage/async-storage';
import { Platform } from 'expo-modules-core';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});


export default function App() {

    const [IsReady, SetIsReady] = useState(false);
    const [notification, setNotification] = useState(false);
    const LoadFonts = async () => {
        await useFonts();
    };



    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        const getPermission = async () => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if(existingStatus !== 'granted'){
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if(finalStatus !== 'granted'){
                //enable notifications first
                await storage.setItem('expopushtoken', '');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            await storage.setItem('expopushtoken', token);

            if(Platform.OS === 'android'){
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF213F7C'
                });
                console.log(token);
            }
        }

        getPermission();

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response =>{});

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    if (!IsReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => SetIsReady(true)}
                onError={() => {
                }}
            />
        );
    }

    return (
        <Provider store={store}>
            <StatusBar backgroundColor={'transparent'} translucent
                //StatusBarStyle={'dark-content'}
                       style="dark"/>
            <NavigationContainer>
                <LoginStackNavigator />
                <FlashMessage icon='auto' duration={3000} style={{ marginTop: 50 }} />
            </NavigationContainer>
        </Provider>

    );
}
