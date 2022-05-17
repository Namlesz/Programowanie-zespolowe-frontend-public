import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Keyboard,
    TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { showMessage } from 'react-native-flash-message';
import styles from '../styles';
import { useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import ButtonComponent from '../components/buttonComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import ActivityComponent from '../components/activityComponent';
import StarComponent from '../components/starComponent';

const navbar_home_button = require('../assets/navbar_home_button.png');
const navbar_home_button_active = require('../assets/navbar_home_button_active.png');
const navbar_search_button = require('../assets/navbar_search_button.png');
const navbar_search_button_active = require('../assets/navbar_search_button_active.png');
const navbar_add_button = require('../assets/navbar_add_button.png');
const navbar_add_button_active = require('../assets/navbar_add_button_active.png');
const hamburger_button_icon = require('../assets/hamburger_button.png');
const notification_button_icon = require('../assets/notification_button.png');
const support_button_icon = require('../assets/support_button.png');
const note_background = require('../assets/note_background.png');

let note;

function setNote(data) {
    note = data;
}

let authorId;

function setAuthorId(id) {
    authorId = id;
}

export { authorId, setAuthorId };

let user3;

function setUser3(data) {
    user3 = data;
}

export { user3, setUser3 };

export default function CommentFormScreen({ navigation }) {
    const noteId = useSelector((state) => state.noteId.value);
    const userData = useSelector((state) => state.userData);

    const [buttonDisplay1, setButtonDisplay1] = useState(false);
    const [buttonDisplay2, setButtonDisplay2] = useState(false);
    const [buttonDisplay3, setButtonDisplay3] = useState(false);
    const [dataAvailable, setDataAvailable] = useState(false);
    const [disable, setDisable] = React.useState(false);
    const [stars, setStars] = useState(require('../assets/3_stars.png'));
    const [rating, setRating] = useState(3);
    const [desc, setDesc] = useState('');
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

    function getDetails() {
        fetch('https://notedealer-api.herokuapp.com/note/'+noteId.payload)
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            setNote(data);
                            if (data.data.author === userData._id) {
                                setEditable(true);
                            }
                        })
                        .then(() => setDataAvailable(true));
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

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            setDataAvailable(false);
            getDetails();
        });
    }, [navigation]);

    function sendComment() {
        setIsLoading(true);
        fetch('https://notedealer-api.herokuapp.com/note/comments', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorName: userData.name,
                authorSurname: userData.surname,
                noteId: noteId.payload,
                creationDate: new Date(),
                content: desc,
                rating: rating
            })
        })
            .then((response) => {
                setIsLoading(false);
                console.log(response.status);
                if (response.status === 200) {
                    showMessage({
                        message: 'Dodano komentarz',
                        type: 'success'
                    });
                    navigation.goBack();
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }

    function setStarsImage(value) {
        if (value === 5) {
            setStars(require('../assets/active_stars.png'));
        } else if (value === 4) {
            setStars(require('../assets/4_stars.png'));
        } else if (value === 3) {
            setStars(require('../assets/3_stars.png'));
        } else if (value === 2) {
            setStars(require('../assets/2_stars.png'));
        } else if (value === 1) {
            setStars(require('../assets/1_star.png'));
        } else {
            setStars(require('../assets/0_star.png'));
        }
    }

    if (dataAvailable) {
        setAuthorId(note.data.author);

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation} />
                        </View>

                        <ScrollView horizontal={false} style={{ marginTop: 100, display: 'flex' }}>
                            <Text style={styles.title2}>Oceń notatkę</Text>

                            <NeomorphBox style={styles.neuNoteBoxComment}>
                                <View style={styles.detailsNoteInfo}>
                                    <View style={styles.searchImageContainerDetails}>
                                        <Image
                                            source={note_background}
                                            style={styles.searchImageBoxBackground}
                                        />
                                        <Text style={styles.textSearch}>
                                            Liczba stron: {note.data.numberOfPages}</Text>
                                    </View>
                                    <View style={styles.detailsInfoContainer}>
                                        <View style={styles.searchTittleContainer}>
                                            <Text style={styles.searchTextTittle}>
                                                {note.data.title}
                                            </Text>
                                        </View>
                                        <StarComponent
                                            rating={note.data.rating}
                                            style={styles.ratingSearch2}
                                        />
                                        <Text style={styles.textSearch1}>
                                            Rok studiów: {note.data.year}
                                        </Text>
                                        <Text style={styles.textSearch1}>
                                            Data utworzenia:{' '}
                                            {new Date(note.data.creationDate).toLocaleDateString()}
                                        </Text>
                                        <Text style={styles.textSearch1}>Tagi:</Text>
                                        <Text style={styles.textSearchPrice}>
                                            {note.data.price}zł
                                        </Text>
                                    </View>
                                </View>
                            </NeomorphBox>

                            <View style={styles.buttonMargin4}>
                                <NeomorphBox style={styles.neuRatingBoxComment}>
                                    <Text style={styles.text1v2}>Wybierz ocenę</Text>

                                    <Image
                                        source={stars}
                                        resizeMode="contain"
                                        style={styles.rating}
                                    />

                                    <Slider
                                        style={{ width: '82%', height: 60 }}
                                        minimumValue={1}
                                        maximumValue={5}
                                        minimumTrackTintColor="#E70465"
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor="#13d8d5"
                                        step={1}
                                        value={rating}
                                        onValueChange={setStarsImage}
                                        onSlidingComplete={setRating}
                                    />
                                </NeomorphBox>
                            </View>

                            <View style={styles.buttonMargin4}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={styles.neuInnerDetails}
                                >
                                    <TextInput
                                        value={desc}
                                        onChangeText={setDesc}
                                        placeholder="*Treść komentarza..."
                                        multiline={true}
                                        style={styles.textInputDesc}
                                    />
                                </NeomorphBox>

                                <Text style={styles.text4}>*Opcjonalne</Text>
                            </View>
                            <View style={
                                keyboardStatus === 'Keyboard Shown'
                                    ? {marginBottom: 230, marginTop: 25}
                                    : styles.buttonMargin4
                            }>
                                <ButtonComponent
                                    title="Wyślij ocenę"
                                    onPress={() => sendComment()}
                                    disabled={isLoading}
                                />
                            </View>

                            <View style={{ marginBottom: 100, marginTop: 20 }}></View>
                        </ScrollView>
                    </View>
                    <NavbarComponent navigation={navigation} />
                    {isLoading ? <ActivityComponent /> : null}
                </SafeAreaView>
            </View>
        );
    } else if (!dataAvailable) {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#63ece9" />
                </View>
            </View>
        );
    }
}
