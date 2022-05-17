import * as React from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent';
import ActivityComponent from '../components/activityComponent';


export default function PasswordResetScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
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
        if (email === '') {
            showMessage({
                message: 'Podaj email',
                type: 'danger'
            });
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/resetPassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response.status);
                    navigation.navigate('LoginEmail');
                })
                .catch((error) => {
                    setIsLoading(false);
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
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <View style={styles.container}>
                        <SafeAreaView style={{ alignSelf: 'stretch' }}>
                            <View style={styles.containerInner}>
                                <ScrollView
                                    horizontal={false}
                                    removeClippedSubviews={true}
                                >
                                    <View style={styles.center}>
                                        <View style={{marginTop: 100}}/>
                                        <Text style={styles.title}>Przywracanie hasła</Text>

                                        <View style={styles.textInputMargin2}>
                                            <NeomorphBox
                                                inner
                                                lightShadowColor="#ffffff"
                                                darkShadowColor="#bec8d2"
                                                style={styles.neuInner}
                                            >
                                                <InputOutlineComponent
                                                    placeholder="Adres Email"
                                                    value={email}
                                                    onChangeText={setEmail}
                                                />
                                            </NeomorphBox>
                                        </View>

                                        <View style={{ marginBottom: 80 }}>
                                            <Text style={styles.text2}>
                                                Podaj swój email. Wyślemy na niego tymczasowe hasło. Możesz
                                                zmienić hasło po zalogowaniu w profilu.
                                            </Text>
                                        </View>

                                        <View style={
                                            keyboardStatus === 'Keyboard Shown'
                                                ? {marginBottom: 330}
                                                : styles.buttonMargin
                                        }>
                                            <ButtonComponent
                                                title="Wyślij"
                                                onPress={() => send()}
                                                disabled={isLoading}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                                {isLoading ? <ActivityComponent /> : null}
                            </View>
                        </SafeAreaView>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    );
}
