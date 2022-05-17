import React from 'react';
import styles from '../styles';
import { View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import {notWorking} from '../utils/alert'

const hamburger_button_icon = require('../assets/hamburger_button.png');
const notification_button_icon = require('../assets/notification_button.png');
const support_button_icon = require('../assets/support_button.png');

const HeaderBarComponent = (props) => {
    return (
        <View style={styles.headerBar}>
            <NeomorphBox style={styles.hamburger_button}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.openDrawer()}
                >
                    <Image source={hamburger_button_icon} style={styles.hamburger_button_icon} />
                </TouchableOpacity>
            </NeomorphBox>
            <NeomorphBox style={styles.notification_button}>
                <TouchableOpacity onPress={() => notWorking()}
                    style={styles.button}
                >
                    <Image
                        source={notification_button_icon}
                        style={styles.notification_button_icon}
                    />
                </TouchableOpacity>
            </NeomorphBox>
            <NeomorphBox style={styles.support_button}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('BugReportForm')}
                >
                    <Image source={support_button_icon} style={styles.support_button_icon} />
                </TouchableOpacity>
            </NeomorphBox>
        </View>
    );
};
export default HeaderBarComponent;
