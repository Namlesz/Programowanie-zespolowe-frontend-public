import { Text, View, KeyboardAvoidingView, ScrollView, Keyboard,
    TouchableWithoutFeedback} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector } from 'react-redux';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function CardFormScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);

    const [owner, setOwner] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [ccv, setCcv] = React.useState('');
    const [expires, setExpires] = React.useState('');
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
        if (owner === '') {
            showMessage({
                message: 'Imię i nazwisko nie może być puste',
                type: 'danger'
            });
        } else if (owner.split(/\W/).length !== 2 || owner.split(/\W/)[1] === '' || owner.split(/\W/)[0] === ''){
            showMessage({
                message: 'Podaj imię i nazwisko',
                type: 'danger'
            });
        } else if (number === '') {
            showMessage({
                message: 'Numer konta nie może być pusty',
                type: 'danger'
            });
        } else if (expires === '') {
            showMessage({
                message: 'Data ważności nie może być pusta',
                type: 'danger'
            });
        } else if (!/\b..\/..\b/i.test(expires)) {
            showMessage({
                message: 'Niepoprawny format daty ważności',
                type: 'danger'
            });
        } else if (Number(expires.split('/')[0]) > 12) {
            showMessage({
                message: 'Błędny numer miesiąca',
                type: 'danger'
            });
        } else if (ccv === 0) {
            showMessage({
                message: 'Numer CCV nie może być pusty',
                type: 'danger'
            });
        } else if (Number(ccv) <= 99 || Number(ccv) >= 1000) {
            showMessage({
                message: 'Numer CCV musi być trzy-cyfrowy',
                type: 'danger'
            });
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/creditCards', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: userData._id,
                    card_number: number,
                    ccv: ccv,
                    owner: owner,
                    expires: expires
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response.status);
                    if (response.status === 421)
                        showMessage({
                            message: 'Nieporawny numer karty',
                            type: 'danger'
                        });
                    else if (response.status === 422)
                        showMessage({
                            message: 'Numer karty już istnieje',
                            type: 'danger'
                        });
                    else navigation.goBack();
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
                                <Text style={styles.title}>Dodanie karty kredytowej</Text>
                                <View style={styles.textInputMargin}>
                                    <NeomorphBox
                                        inner
                                        lightShadowColor="#ffffff"
                                        darkShadowColor="#bec8d2"
                                        style={styles.neuInner}
                                    >
                                        <InputOutlineComponent
                                            placeholder="Imię i nazwisko na karcie"
                                            value={owner}
                                            onChangeText={setOwner}
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
                                            placeholder="Numer karty"
                                            value={number}
                                            onChangeText={setNumber}
                                            keyboardType="decimal-pad"
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
                                            placeholder="Data ważności (mm/RR)"
                                            value={expires}
                                            onChangeText={setExpires}
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
                                            placeholder="CCV"
                                            value={ccv.toString()}
                                            onChangeText={setCcv}
                                        />
                                    </NeomorphBox>
                                </View>

                                <View style={{ marginBottom: 60 }}>
                                    <Text style={styles.text2}>Podaj dane karty</Text>
                                </View>

                                <View style={
                                    keyboardStatus === 'Keyboard Shown'
                                        ? {marginBottom: 350}
                                        : {marginBottom: 150, marginTop: -40}
                                }>
                                    <ButtonComponent
                                        title="Dodaj"
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
