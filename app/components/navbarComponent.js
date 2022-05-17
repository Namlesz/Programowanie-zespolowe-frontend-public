import React, { useState } from 'react';
import styles from '../styles';
import Image from 'react-native-remote-svg';
import { TouchableOpacity, View } from 'react-native';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import navbar_home_button_active from '../assets/navbar_home_button_active.png';
import navbar_search_button_active from '../assets/navbar_search_button_active.png';
import navbar_search_button from '../assets/navbar_search_button.png';
import navbar_add_button_active from '../assets/navbar_add_button_active.png';
import navbar_add_button from '../assets/navbar_add_button.png';
import navbar_home_button from '../assets/navbar_home_button.png';

const NavbarComponent = (props) => {
    const [buttonDisplay1, setButtonDisplay1] = useState(false);
    const [buttonDisplay2, setButtonDisplay2] = useState(false);
    const [buttonDisplay3, setButtonDisplay3] = useState(false);

    const onPressHandler1 = () => {
        buttonDisplay1 ? setButtonDisplay1(false) : setButtonDisplay1(true);
    };
    const onPressHandler2 = () => {
        buttonDisplay2 ? setButtonDisplay2(false) : setButtonDisplay2(true);
    };
    const onPressHandler3 = () => {
        buttonDisplay3 ? setButtonDisplay3(false) : setButtonDisplay3(true);
    };

    let homeBoxDisplay = function () {
        if (props.homeButtonActive)
            return (
                <NeomorphBox inner swapShadowLevel style={styles.navbar_bg_inner}>
                    <TouchableOpacity activeOpacity={1} style={styles.button}>
                        <Image
                            source={navbar_home_button_active}
                            style={styles.navbar_home_button}
                        />
                    </TouchableOpacity>
                </NeomorphBox>
            );
        else
            return (
                <NeomorphBox
                    inner
                    swapShadowLevel
                    style={buttonDisplay1 ? styles.navbar_bg_inner : styles.navbar_bg_inner_hidden}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.button}
                        onPressIn={() => onPressHandler1()}
                        onPressOut={() => onPressHandler1()}
                        onPress={() => props.navigation.navigate('Home')}
                    >
                        <Image
                            source={buttonDisplay1 ? navbar_home_button_active : navbar_home_button}
                            style={styles.navbar_home_button}
                        />
                    </TouchableOpacity>
                </NeomorphBox>
            );
    };

    let searchBoxDisplay = function () {
        if (props.searchButtonActive)
            return (
                <NeomorphBox inner swapShadowLevel style={styles.navbar_bg_inner}>
                    <TouchableOpacity activeOpacity={1} style={styles.button}>
                        <Image
                            source={navbar_search_button_active}
                            style={styles.navbar_search_button}
                        />
                    </TouchableOpacity>
                </NeomorphBox>
            );
        else
            return (
                <NeomorphBox
                    inner
                    swapShadowLevel
                    style={buttonDisplay2 ? styles.navbar_bg_inner : styles.navbar_bg_inner_hidden}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.button}
                        onPressIn={() => onPressHandler2()}
                        onPressOut={() => onPressHandler2()}
                        onPress={() => props.navigation.navigate('Search')}
                    >
                        <Image
                            source={
                                buttonDisplay2 ? navbar_search_button_active : navbar_search_button
                            }
                            style={styles.navbar_search_button}
                        />
                    </TouchableOpacity>
                </NeomorphBox>
            );
    };

    let addBoxDisplay = function () {
        if (props.addButtonActive)
            return (
                <NeomorphBox inner swapShadowLevel style={styles.navbar_bg_inner}>
                    <TouchableOpacity activeOpacity={1} style={styles.button}>
                        <Image source={navbar_add_button_active} style={styles.navbar_add_button} />
                    </TouchableOpacity>
                </NeomorphBox>
            );
        else
            return (
                <NeomorphBox
                    inner
                    swapShadowLevel
                    style={buttonDisplay3 ? styles.navbar_bg_inner : styles.navbar_bg_inner_hidden}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.button}
                        onPressIn={() => onPressHandler3()}
                        onPressOut={() => onPressHandler3()}
                        onPress={() => props.navigation.navigate('Add')}
                    >
                        <Image
                            source={buttonDisplay3 ? navbar_add_button_active : navbar_add_button}
                            style={styles.navbar_add_button}
                        />
                    </TouchableOpacity>
                </NeomorphBox>
            );
    };

    return (
        <>
            <Image id="navbar" source={require('../assets/navbar.png')} style={styles.navbar} />
            <View style={styles.navbarPos}>
                <NeomorphBox
                    lightShadowColor="#ffb3b5"
                    darkShadowColor="#ff4d72"
                    style={styles.navbar_home_button_bg}
                >
                    {homeBoxDisplay()}
                </NeomorphBox>

                <NeomorphBox
                    lightShadowColor="#ffb3b5"
                    darkShadowColor="#ff4d72"
                    style={styles.navbar_search_button_bg}
                >
                    {searchBoxDisplay()}
                </NeomorphBox>

                <NeomorphBox
                    lightShadowColor="#ffb3b5"
                    darkShadowColor="#ff4d72"
                    style={styles.navbar_add_button_bg}
                >
                    {addBoxDisplay()}
                </NeomorphBox>
            </View>
        </>
    );
};
export default NavbarComponent;
