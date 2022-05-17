import * as React from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAvatar } from '../utils/userAvatarSlice';
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from '@expo/vector-icons';
import ButtonComponent from '../components/buttonComponent'
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';

export default function AvatarFormScreen({ navigation }) {
    const userAvatar = useSelector((state) => state.userAvatar);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [doc, setDoc] = React.useState(null);
    const [avatar, setAvatar] = React.useState(userAvatar.fileUri);
    const [isLoading, setIsLoading] = React.useState(false);

    const pickDocument = async () =>
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            quality:1
        })
            .then(async (response) => {
                if (!response.cancelled) {
                    let tmp_img = await FileSystem.getInfoAsync(response.uri);

                    let uri_cut = response.uri.split('/');
                    let name = uri_cut[uri_cut.length - 1];

                    let nameParts = name.split('.');
                    let fileType = nameParts[nameParts.length - 1];

                    let fileToUpload = {
                        name: name,
                        size: tmp_img.size,
                        uri: response.uri,
                        type: 'application/' + fileType
                    };
                    setDoc(fileToUpload);
                    setAvatar(response.uri);
                }
            })
            .catch((error) => {
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });

    const postDocument = () => {
        setIsLoading(true);
        const url = 'https://notedealer-api.herokuapp.com/changeUserAvatar';
        const formData = new FormData();
        formData.append('image', doc);
        formData.append('_id', userData._id);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData);
        fetch(url, options).catch((error) => console.log(error));
        dispatch(setUserAvatar(doc.uri));
        navigation.goBack();
    };

    function sendIfPicked() {
        if (doc !== null) {
            postDocument();
        } else {
            navigation.goBack();
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View>
                <View style={styles.container}>
                    <SafeAreaView style={{ alignSelf: 'stretch' }}>
                        <View style={styles.containerInner}>
                            <View style={styles.center}>
                                <HeaderBarComponent navigation={navigation} />
                                <Text style={styles.title}>Zmiana zdjęcia profilowego</Text>

                                <View style={styles.textInputMargin}>
                                    <NeomorphBox style={styles.neuProfilePicture}>
                                        <TouchableOpacity onPress={pickDocument}>
                                            {
                                                avatar !== '' ?
                                                    <Image
                                                        source={{uri: avatar}}
                                                        style={{
                                                            width: 114,
                                                            height: 114,
                                                            borderRadius: 12,
                                                            marginTop: 3
                                                        }}
                                                    />
                                                    :
                                                    <FontAwesome5
                                                        name={"user-alt"}
                                                        color={"grey"}
                                                        size={114}

                                                    />

                                            }
                                        </TouchableOpacity>
                                    </NeomorphBox>
                                </View>

                                <View style={{ marginBottom: 80 }}>
                                    <Text style={styles.text2}>Kliknij w obrazek, </Text>
                                    <Text style={styles.text2}>
                                        aby wybrać nowe zdjęcie profilowe
                                    </Text>
                                </View>

                                <View style={styles.buttonMargin}>
                                    <ButtonComponent
                                        title="Wyślij"
                                        onPress={() => sendIfPicked()}
                                        disabled={isLoading}
                                    />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
                <NavbarComponent navigation={navigation} />
                {isLoading ? <ActivityComponent /> : null}
            </View>
        </KeyboardAvoidingView>
    );
}
