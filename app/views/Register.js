import * as React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import styles from '../styles';
import InputOutlineComponent from '../components/inputComponent';
import * as Notifications from 'expo-notifications';
import ButtonComponent from '../components/buttonComponent';
import ActivityComponent from '../components/activityComponent';

function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

async function register(
    {navigation},
    imie,
    nazwisko,
    email,
    haslo,
    haslo2,
    nick,
    school,
    major,
    isChecked,
    isLoading,
    setIsLoading
) {
    if (imie === '') {
        showMessage({
            message: 'Imie nie może być puste',
            type: 'danger'
        });
    } else if (nazwisko === '') {
        showMessage({
            message: 'Nazwisko nie może być puste',
            type: 'danger'
        });
    } else if (email === '') {
        showMessage({
            message: 'Email nie może być pusty',
            type: 'danger'
        });
    } else if (!validateEmail(email)) {
        showMessage({
            message: 'Błędny format email',
            type: 'danger'
        });
    } else if (haslo === '') {
        showMessage({
            message: 'Hasło nie może być puste',
            type: 'danger'
        });
    } else if (haslo.length < 8){
        showMessage({
            message: 'Hasło musi zawierać więcej niż 8 znaków',
            type: 'danger'
        });
    } else if (haslo !== haslo2) {
        showMessage({
            message: 'Hasła się nie zgadzają',
            type: 'danger'
        });
    } else if (!isChecked) {
        showMessage({
            message: 'Nie zaakceptowano warunków rejestracji',
            type: 'danger'
        });
    } else {
        /*
        Notifications.getExpoPushTokenAsync().then((res) => {
            let token = res.data;
            console.log(token);
        });
        */
        const token = (await Notifications.getExpoPushTokenAsync()).data;

        setIsLoading(true);
        fetch('https://notedealer-api.herokuapp.com/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nick.toString(),
                password: haslo.toString(),
                name: imie.toString(),
                surname: nazwisko.toString(),
                email: email.toString(),
                school: school.toString(),
                major: major.toString(),
                expoPushNotificationsToken: token.toString()
            })
        })
            .then((response) => {
                console.log(response.status);
                console.log(response.statusText);
                setIsLoading(false);
                if (response.status === 201) {

                    navigation.navigate('LoginEmail');
                } else if (response.status === 409) {

                    showMessage({
                        message: 'Podany email jest już zajęty',
                        type: 'danger'
                    });
                } else if (response.status === 500) {
                    showMessage({
                        message: 'Podany email ma niepoprawny format',
                        type: 'danger'
                    });
                } else if (response.status === 400) {
                    showMessage({
                        message: 'Błąd po stronie serwera',
                        type: 'danger'
                    });
                } else {
                    showMessage({
                        message: 'Błąd',
                        type: 'danger'
                    });
                }
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

export default function RegisterScreen({navigation}) {
    const [imie, setImie] = React.useState('');
    const [nazwisko, setNazwisko] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [haslo, setHaslo] = React.useState('');
    const [haslo2, setHaslo2] = React.useState('');
    const [nick, setNick] = React.useState('');
    const [school, setSchool] = React.useState('');
    const [major, setMajor] = React.useState('');
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    return (
        <View>
            <ScrollView horizontal={false} style={{backgroundColor: '#e9eeef'}}>
                <SafeAreaView
                    style={{
                        alignSelf: 'stretch',
                        marginTop: 60,
                        marginBottom: 35
                    }}
                >
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <Text style={styles.title}>Rejestracja</Text>

                            <View style={styles.textInputMargin}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={styles.neuInner}
                                >
                                    <InputOutlineComponent
                                        placeholder="Imię"
                                        value={imie}
                                        onChangeText={setImie}
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
                                        placeholder="Nazwisko"
                                        value={nazwisko}
                                        onChangeText={setNazwisko}
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
                                        placeholder="Adres e-mail"
                                        value={email}
                                        onChangeText={setEmail}
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
                                        placeholder="Hasło"
                                        secureTextEntry={true}
                                        value={haslo}
                                        onChangeText={setHaslo}
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
                                        placeholder="Powtórz hasło"
                                        secureTextEntry={true}
                                        value={haslo2}
                                        onChangeText={setHaslo2}
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
                                        placeholder="*Pseudonim"
                                        value={nick}
                                        onChangeText={setNick}
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
                                        placeholder="*Uczelnia/szkoła"
                                        value={school}
                                        onChangeText={setSchool}
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
                                        placeholder="*Kierunek"
                                        value={major}
                                        onChangeText={setMajor}
                                    />
                                </NeomorphBox>
                            </View>

                            <Text style={styles.text4}>*Opcjonalne</Text>

                            <BouncyCheckbox
                                style={styles.checkBox}
                                textStyle={styles.checkBoxText}
                                iconStyle={styles.checkBoxIcon}
                                fillColor="#62eae8"
                                onPress={() => {
                                    setCheckboxState(!checkboxState);
                                }}
                                text="Akceptuje warunki rejestracji"
                            />

                            <View style={styles.buttonMargin}>
                                <ButtonComponent
                                    title="Zarejestuj się"
                                    onPress={() =>
                                        register(
                                            {navigation},
                                            imie,
                                            nazwisko,
                                            email,
                                            haslo,
                                            haslo2,
                                            nick,
                                            school,
                                            major,
                                            checkboxState,
                                            isLoading,
                                            setIsLoading
                                        )
                                    }
                                    disabled={isLoading}
                                />
                            </View>
                        </View>

                        <View style={styles.register}>
                            <Text style={styles.text2}>Masz już konto?</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('LoginEmail')}>
                                <Text style={styles.text3}>Zaloguj się</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
            {isLoading ? <ActivityComponent /> : null}
        </View>
    );
}
