import * as React from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    ActivityIndicator, Platform, Keyboard, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import styles from '../styles';
import {useSelector} from 'react-redux';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent'
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function AccountFormScreen({navigation}) {
    const userData = useSelector((state) => state.userData);

    const [account, setAccount] = React.useState('');
    const [dataAvailable, setDataAvailable] = React.useState(false);
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

    function getAccountNumber() {
        fetch('https://notedealer-api.herokuapp.com/getAccountNumber', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userData._id
            })
        }).then((response) => {
            if (response.status === 201) {
                response.text().then((text) => {
                    setAccount(text);
                });
            }
            setDataAvailable(true);
        });
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getAccountNumber();
        });
    }, [navigation]);

    function send() {
        if (account === '') {
            showMessage({
                message: 'Nowy numer konta nie może być pusty',
                type: 'danger'
            })
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/changeUserData', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: userData._id,
                    bank_account: account.toString()
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response.status);
                    if (response.status === 201){
                        navigation.goBack();
                    }
                    else if(response.status === 400){
                        showMessage({
                            message: 'Podaj prawidłowy numer konta',
                            type: 'danger'
                        })
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

    if (dataAvailable) {
        return (
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => {
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
                                    <Text style={styles.title}>Zmiana numeru konta</Text>

                                    <View style={styles.textInputMargin2}>
                                        <NeomorphBox
                                            inner
                                            lightShadowColor="#ffffff"
                                            darkShadowColor="#bec8d2"
                                            style={styles.neuInner}
                                        >
                                            <InputOutlineComponent
                                                placeholder="Numer konta"
                                                value={account}
                                                onChangeText={setAccount}
                                                keyboardType="numeric"
                                            />
                                        </NeomorphBox>
                                    </View>

                                    <View style={{marginTop: -80, marginBottom: 80}}>
                                        <Text style={styles.text2}>Podaj nowy numer konta</Text>
                                    </View>

                                    <View style={
                                        keyboardStatus === 'Keyboard Shown'
                                            ? {marginBottom: 350}
                                            : styles.buttonMargin
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
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#63ece9"/>
                </View>
            </View>
        );
    }
}
