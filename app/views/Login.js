import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import {notWorking} from '../utils/alert'

export default function LoginScreen({navigation}) {
    const [buttonDisplay1, setButtonDisplay1] = useState(false);
    const [buttonDisplay2, setButtonDisplay2] = useState(false);
    const [buttonDisplay3, setButtonDisplay3] = useState(false);
    const [buttonDisplay4, setButtonDisplay4] = useState(false);

    const onPressHandler1 = () => {
        buttonDisplay1 ? setButtonDisplay1(false) : setButtonDisplay1(true);
    };
    const onPressHandler2 = () => {
        buttonDisplay2 ? setButtonDisplay2(false) : setButtonDisplay2(true);
    };
    const onPressHandler3 = () => {
        buttonDisplay3 ? setButtonDisplay3(false) : setButtonDisplay3(true);
    };
    const onPressHandler4 = () => {
        buttonDisplay4 ? setButtonDisplay4(false) : setButtonDisplay4(true);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignSelf: 'stretch'}}>
                <View style={styles.containerInner}>
                    <View style={styles.center}>
                        <Text style={styles.title}>Logowanie</Text>

                        <View style={styles.buttonMargin}>
                            <NeomorphBox style={styles.neu}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={
                                        buttonDisplay1 ? styles.neuInner : styles.neuInner_hidden
                                    }
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.button}
                                        onPressIn={() => onPressHandler1()}
                                        onPressOut={() => onPressHandler1()}
                                        onPress={() => navigation.navigate('LoginEmail')}
                                    >
                                        <Text style={styles.text1}>
                                            Zaloguj się przy użyciu e-maila
                                        </Text>
                                    </TouchableOpacity>
                                </NeomorphBox>
                            </NeomorphBox>
                        </View>

                        <View style={styles.buttonMargin}>
                            <NeomorphBox style={styles.neu}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={
                                        buttonDisplay2 ? styles.neuInner : styles.neuInner_hidden
                                    }
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.button}
                                        onPressIn={() => onPressHandler2()}
                                        onPressOut={() => onPressHandler2()}
                                        onPress={() => notWorking()}
                                    >
                                        <Text style={styles.text1}>Zaloguj się przez Google</Text>
                                    </TouchableOpacity>
                                </NeomorphBox>
                            </NeomorphBox>
                        </View>

                        <View style={styles.buttonMargin}>
                            <NeomorphBox style={styles.neu}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={
                                        buttonDisplay3 ? styles.neuInner : styles.neuInner_hidden
                                    }
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.button}
                                        onPressIn={() => onPressHandler3()}
                                        onPressOut={() => onPressHandler3()}
                                        onPress={() => notWorking()}
                                    >
                                        <Text style={styles.text1}>
                                            Zaloguj się przez Facebooka
                                        </Text>
                                    </TouchableOpacity>
                                </NeomorphBox>
                            </NeomorphBox>
                        </View>

                        <View>
                            <NeomorphBox style={styles.neu}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={
                                        buttonDisplay4 ? styles.neuInner : styles.neuInner_hidden
                                    }
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.button}
                                        onPressIn={() => onPressHandler4()}
                                        onPressOut={() => onPressHandler4()}
                                        onPress={() => notWorking()}
                                    >
                                        <Text style={styles.text1}>Zaloguj się przez Apple</Text>
                                    </TouchableOpacity>
                                </NeomorphBox>
                            </NeomorphBox>
                        </View>
                    </View>

                    <View style={styles.register}>
                        <Text style={styles.text2}>Nie masz jeszcze konta?</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.text3}>Zarejestuj się</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
