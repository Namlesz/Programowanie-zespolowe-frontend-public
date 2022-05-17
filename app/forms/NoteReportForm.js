import * as React from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView,Keyboard, TouchableWithoutFeedback } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { Picker } from '@react-native-picker/picker';
import { useSelector} from 'react-redux';
import InputOutlineComponent from '../components/inputComponent';
import ButtonComponent from '../components/buttonComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function NoteReportFormScreen({ navigation }) {
    const noteId = useSelector((state) => state.noteId.value);
    const [reason, setReason] = React.useState('');
    const [desc, setDesc] = React.useState('');
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
        if (reason === '') {
            showMessage({
                message: 'Wybierz powód zgłoszenia',
                type: 'danger'
            });
        } else {
            setIsLoading(true);
            fetch('https://notedealer-api.herokuapp.com/report/note', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    noteId: noteId.payload,
                    reason: reason,
                    description: desc
                })
            })
                .then((response) => {
                    setIsLoading(false);
                    console.log(response.status);
                    if (response.status === 201) {
                        showMessage({
                            message: 'Dodano zgłoszenie',
                            type: 'warning'
                        });
                        navigation.goBack();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
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
                                <View style={styles.center}>
                                    <Text style={styles.title}>Zgłoś notatkę</Text>
                                    <View style={styles.textInputMargin}>
                                    <View style={{marginTop: -30}}/>
                                        <Text style={styles.text4}>Wybierz powód zgłoszenia</Text>

                                        <Picker
                                            selectedValue={reason}
                                            onValueChange={(itemValue) =>
                                                setReason(itemValue)
                                            }
                                        >
                                            <Picker.Item
                                                label="Wybierz powód"
                                                value=""
                                                enabled={false}
                                            />
                                            <Picker.Item
                                                label="Wulgarny język"
                                                value="Wulgarny język"
                                            />
                                            <Picker.Item
                                                label="Nieodpowiednia treść"
                                                value="Nieodpowiednia treść"
                                            />
                                            <Picker.Item
                                                label="Naruszenie praw autorskich"
                                                value="Naruszenie praw autorskich"
                                            />
                                            <Picker.Item
                                                label="Oszustwo/Treść niezgodna z opisem"
                                                value="Oszustwo/Treść niezgodna z opisem"
                                            />
                                            <Picker.Item
                                                label="Niska jakość notatki"
                                                value="Niska jakość notatki"
                                            />
                                        </Picker>
                                    </View>
                                    <View style={styles.buttonMargin4}>
                                        <NeomorphBox
                                            inner
                                            lightShadowColor="#ffffff"
                                            darkShadowColor="#bec8d2"
                                            style={styles.neuInnerDetails}
                                        >
                                            <InputOutlineComponent
                                                value={desc}
                                                onChangeText={setDesc}
                                                placeholder="*Treść zgłoszenia..."
                                            />
                                        </NeomorphBox>
                                    </View>
                                    <View style={{marginTop: -30}}/>
                                    <Text style={styles.text4}>*Opcjonalne</Text>
                                    <View style={
                                        keyboardStatus === 'Keyboard Shown'
                                            ? {marginBottom: 350}
                                            : {marginBottom: 130}
                                    }>
                                        <ButtonComponent
                                            title="Wyślij"
                                            onPress={() => send()}
                                            disabled={isLoading}
                                        />
                                    </View>
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
