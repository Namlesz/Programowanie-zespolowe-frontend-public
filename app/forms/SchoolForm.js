import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUserSchool, setUserMajor } from '../utils/userSlice';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function SchoolFormScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [school, setSchool] = React.useState(userData.school);
    const [major, setMajor] = React.useState(userData.major);
    const [isLoading, setIsLoading] = React.useState(false);

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

    function send() {
        setIsLoading(true);
        fetch('https://notedealer-api.herokuapp.com/changeUserData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userData._id,
                school: school,
                major: major
            })
        })
            .then((response) => {
                setIsLoading(false);
                console.log(response.status);
                dispatch(setUserSchool(school));
                dispatch(setUserMajor(major));
                navigation.goBack();
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });
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
                                <Text style={styles.title}>Zmiana szkoły i/lub kierunku</Text>
                                <View style={styles.textInputMargin}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Nowa szkoła/uczelnia"
                                            value={school}
                                            onChangeText={setSchool}
                                        />
                                    </NeomorphBox>
                                </View>

                                <View style={styles.textInputMargin2}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Nowy kierunek"
                                            value={major}
                                            onChangeText={setMajor}
                                        />
                                    </NeomorphBox>
                                </View>

                                <View style={{ marginTop: -80, marginBottom: 40 }}>
                                    <Text style={styles.text2}>
                                        Podaj nową szkołę i/lub kierunek
                                    </Text>
                                </View>

                                <View style={
                                    keyboardStatus === 'Keyboard Shown'
                                        ? {marginBottom: 350}
                                        : {marginBottom: 150}
                                }>
                                    <ButtonComponent
                                        title="Wyślij"
                                        onPress={() => send()}
                                        disabled={isLoading}
                                    />
                                </View>
                            </ScrollView>
                            <NavbarComponent navigation={navigation} />
                            {isLoading ? <ActivityComponent /> : null}
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    );
}
