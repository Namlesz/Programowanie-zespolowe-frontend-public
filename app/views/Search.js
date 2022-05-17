import React from 'react';
import {View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import InputOutlineComponent from '../components/inputComponent';
import { useDispatch } from 'react-redux';
import { setSearch } from '../utils/searchSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ButtonComponent from '../components/buttonComponent'


export default function SearchScreen({ navigation }) {
    const dispatch = useDispatch();
    const [find, setfind] = React.useState('');

    const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
    const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    function search() {
        dispatch(setSearch(find));
        navigation.navigate('Listing');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <SafeAreaView style={{ alignSelf: 'stretch' }}>
                        <View style={styles.containerInner}>
                            <View style={styles.center}>
                                <HeaderBarComponent navigation={navigation} />
                            </View>
                            <ScrollView
                                style={{marginTop: 100}}
                                horizontal={false}
                                removeClippedSubviews={true}
                            >

                                <Text style={styles.title}>Wyszukaj notatkę</Text>
                                <View style={styles.textInputMargin2}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Wpisz frazę"
                                            value={find}
                                            onChangeText={setfind}
                                        />
                                    </NeomorphBox>
                                </View>
                                <View style={
                                    keyboardStatus === 'Keyboard Shown'
                                        ? {marginBottom: 350}
                                        : styles.buttonMargin
                                }>
                                    <ButtonComponent
                                        title="Wyszukaj"
                                        onPress={() => search()}
                                        disabled={false}
                                    />
                                </View>
                            </ScrollView>
                            <NavbarComponent navigation={navigation} searchButtonActive={true} />
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    );
}
