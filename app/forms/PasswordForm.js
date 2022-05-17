import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import styles from '../styles';
import {useSelector} from 'react-redux';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function PasswordFormScreen({navigation}) {
    const userData = useSelector((state) => state.userData);

    const [oldPass, setOldPass] = React.useState('');
    const [pass1, setPass1] = React.useState('');
    const [pass2, setPass2] = React.useState('');
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
        if (oldPass === '') {
            showMessage({
                message: 'Podaj stare hasło',
                type: 'danger'
            });
        } else if (pass1 === '') {
            showMessage({
                message: 'Hasło nie może być puste',
                type: 'danger'
            });
        } else if (pass1 !== pass2) {
            showMessage({
                message: 'Hasła się nie zgadzają',
                type: 'danger'
            });
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/changePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: userData._id,
                    password: oldPass,
                    newPassword: pass1
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response.status);
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error(error);
                    showMessage({
                        message: 'Błąd połączenia z serwerem',
                        type: 'danger'
                    });
                });
        }
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                }}>
                    <SafeAreaView style={{alignSelf: 'stretch'}}>
                        <View style={styles.containerInner}>
                            <View style={styles.center}>
                                <HeaderBarComponent navigation={navigation} />
                            </View>
                            <ScrollView
                                style={{marginTop: 100}}
                                horizontal={false}
                                removeClippedSubviews={true}
                            >
                                <Text style={styles.title}>Zmiana hasła</Text>

                                <View style={styles.textInputMargin}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Stare hasło"
                                            secureTextEntry={true}
                                            value={oldPass}
                                            onChangeText={setOldPass}
                                        />
                                    </NeomorphBox>
                                </View>
                                <View style={styles.textInputMargin}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Nowe hasło"
                                            secureTextEntry={true}
                                            value={pass1}
                                            onChangeText={setPass1}
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
                                            placeholder="Powtórz nowe hasło"
                                            secureTextEntry={true}
                                            value={pass2}
                                            onChangeText={setPass2}
                                        />
                                    </NeomorphBox>
                                </View>

                                <View style={{marginTop: -100, marginBottom: 60}}>
                                    <Text style={styles.text2}>
                                        Podaj stare hasło, a następnie nowe hasło
                                    </Text>
                                </View>

                                <View style={
                                    keyboardStatus === 'Keyboard Shown'
                                        ? {marginBottom: 350}
                                        : {marginBottom: 100}
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
