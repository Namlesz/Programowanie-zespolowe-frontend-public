import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../views/DrawerContent';
import { StackNavigator } from './StackNavigators';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="StackNavigator"
        drawerContent={(props) => <DrawerContent {...props} />}
    >
        <Drawer.Screen
            name="StackNavigator"
            component={StackNavigator}
            options={{
                headerShown: false,
                drawerItemStyle: { display: 'none' },
                swipeEnabled: false
            }}
        />
    </Drawer.Navigator>
);

export default DrawerNavigator;
