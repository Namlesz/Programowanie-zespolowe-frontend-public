import * as React from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import * as PropTypes from 'prop-types';
import InputOutlineComponent from '../components/inputComponent';
import ActivityComponent from '../components/activityComponent';
import ButtonComponent from '../components/buttonComponent'

export let user;

export default function LoginEmailScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(false);

    function login({ navigation }, email, haslo) {
        if (email === '') {
            showMessage({
                message: 'Email nie może być pusty',
                type: 'danger'
            });
        } else if (haslo === '') {
            showMessage({
                message: 'Hasło nie może być puste',
                type: 'danger'
            });
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.toString(),
                    password: haslo.toString()
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    if (response.status === 200) {
                        response.json().then((data) => {
                            // Work with JSON data here
                            user = data;
                            navigation.navigate('Loading');
                        });
                    } else if (response.status === 404) {
                        showMessage({
                            message: 'Niepoprawny email lub hasło',
                            type: 'danger'
                        });
                    }
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

    InputOutlineComponent.propTypes = {
        onChangeText: PropTypes.func,
        placeholder: PropTypes.string,
        value: PropTypes.string
    };

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [checkboxState, setCheckboxState] = React.useState(false);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView style={{ alignSelf: 'stretch' }}>
                        <View style={styles.containerInner}>
                            <View style={styles.centerBox} />
                            <View style={styles.center}>
                                <Text style={styles.title}>Logowanie</Text>

                                <View style={styles.textInputMargin}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            value={email}
                                            placeholder="E-mail"
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                        />
                                    </NeomorphBox>
                                </View>
                                <View>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Hasło"
                                            secureTextEntry={true}
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                    </NeomorphBox>
                                </View>
                                <BouncyCheckbox
                                    style={styles.checkBox}
                                    textStyle={styles.checkBoxText}
                                    iconStyle={styles.checkBoxIcon}
                                    fillColor="#62eae8"
                                    onPress={() => {
                                        setCheckboxState(!checkboxState);
                                    }}
                                    text="Zapamiętaj mnie"
                                />
                            </View>
                            <View style={styles.centerBox}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PasswordReset')}
                                >
                                    <Text style={styles.text3}>Nie pamiętasz hasła?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.register2}>
                                <View style={styles.buttonMargin}>
                                    <ButtonComponent
                                        title="Zaloguj się"
                                        onPress={() =>
                                            login({ navigation }, email, password)
                                        }
                                        disabled={isLoading}
                                    />
                                </View>
                                <Text style={styles.text2}>Nie masz jeszcze konta?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.text3}>Zarejestruj się</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </ScrollView>
            {isLoading ? <ActivityComponent /> : null}
        </KeyboardAvoidingView>
    );
}
