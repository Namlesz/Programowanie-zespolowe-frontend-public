import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../views/Home';
import AddScreen from '../views/Add';
import AddedScreen from '../views/Added';
import BoughtScreen from '../views/Bought';
import ProfileScreen from '../views/Profile';
import SearchScreen from '../views/Search';
import NickFormScreen from '../forms/NickForm';
import AccountFormScreen from '../forms/AccountForm';
import SchoolFormScreen from '../forms/SchoolForm';
import PasswordFormScreen from '../forms/PasswordForm';
import AvatarFormScreen from '../forms/AvatarForm';
import ListingScreen from '../views/Listing';
import DetailsScreen from '../views/Details';
import ProfilePublicScreen from '../views/ProfilePublic';
import PaymentScreen from '../views/Payment';
import CardsScreen from '../views/Cards';
import SettingsScreen from '../views/Settings';
import CardFormScreen from '../forms/CardForm';
import NoteReportFormScreen from '../forms/NoteReportForm';
import CommentFormScreen from '../forms/CommentForm';
import BugReportFormScreen from '../forms/BugReportForm';
import CommentsScreen from '../views/Comments';
import CommentDetailsScreen from '../views/CommentDetails';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Listing" component={ListingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="ProfilePublic"
            component={ProfilePublicScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="NoteReportForm"
            component={NoteReportFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bought" component={BoughtScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="CommentForm"
            component={CommentFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Added" component={AddedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NickForm" component={NickFormScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="AccountForm"
            component={AccountFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SchoolForm"
            component={SchoolFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AvatarForm"
            component={AvatarFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="PasswordForm"
            component={PasswordFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cards" component={CardsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CardForm" component={CardFormScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="BugReportForm"
            component={BugReportFormScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="CommentDetails"
            component={CommentDetailsScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export { StackNavigator };
