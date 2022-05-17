import React from 'react';
import {View, TouchableOpacity, Text, ScrollView, FlatList, Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import {showMessage} from 'react-native-flash-message';
import * as FileSystem from 'expo-file-system';
import styles from '../styles';
import {useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import InputOutlineComponent from '../components/inputComponent';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import * as ImagePicker from 'expo-image-picker';
import Item from '../components/imageComponent';
import ButtonComponent from '../components/buttonComponent';
import ActivityComponent from '../components/activityComponent';

const navbar_add_button = require('../assets/navbar_add_button.png');

export default function AddScreen({navigation}) {
    const userData = useSelector((state) => state.userData);

    const [title, setTitle] = React.useState('');
    const [school, setSchool] = React.useState(userData.school);
    const [year, setYear] = React.useState('');
    const [major, setMajor] = React.useState(userData.major);
    const [subject, setSubject] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);

    const [images, setImages] = React.useState(['button']);

    const [n, setN] = React.useState(0);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [preview, setPreview] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
    const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

    React.useEffect(() => {
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return navigation.addListener('focus', () => {
        });
    }, [navigation]);

    const pickDocument = async () =>
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            quality:1
        }).then(async (response) => {
            if (!response.cancelled) {
                let tmp_img = await FileSystem.getInfoAsync(response.uri);
                setRefresh(true);

                let uri_cut = response.uri.split('/');
                let name = uri_cut[uri_cut.length - 1];

                let nameParts = name.split('.');
                let fileType = nameParts[nameParts.length - 1];

                let fileToUpload = {
                    name: name,
                    size: tmp_img.size,
                    uri: response.uri,
                    index: n,
                    type: 'application/' + fileType
                };


                images.push(fileToUpload);
                setN(n + 1);
                setRefresh(false);
            }
        });

    function canPickDocument() {
        if (n < 14) {
            pickDocument();
        } else {
            showMessage({
                message: 'Nie można dodać więcej obrazków',
                type: 'danger'
            });
        }
    }

    const postDocument = () => {
        if (title === '') {
            showMessage({
                message: 'Tytuł nie może być pusty',
                type: 'danger'
            });
        } else if (n === 0) {
            showMessage({
                message: 'Należy dodać notatke',
                type: 'danger'
            });
        } else if (school === '') {
            showMessage({
                message: 'Nazwa szkoły nie może być pusta',
                type: 'danger'
            });
        } else if (year === '') {
            showMessage({
                message: 'Należy podać rok studiów',
                type: 'danger'
            });
        } else if (Number(year) >= 5 || Number(year) <= 0) {
            showMessage({
                message: 'Rok poza zakresem',
                type: 'danger'
            });
        } else if(!Number.isInteger(Number(year))){
            showMessage({
                message: 'Rok musi być liczbą całkowitą',
                type: 'danger'
            });
        } else if (major === '') {
            showMessage({
                message: 'Nazwa kierunku nie może być pusta',
                type: 'danger'
            });
        } else if (subject === '') {
            showMessage({
                message: 'Nazwa przedmiotu nie może być pusta',
                type: 'danger'
            });
        } else if (price === '') {
            showMessage({
                message: 'Należy podać cenę notatki',
                type: 'danger'
            });
        }  else {
            setIsLoading(true);
            const url = 'https://notedealer-api.herokuapp.com/note';

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    school: school,
                    year: year,
                    subject: subject,
                    major: major,
                    price: price,
                    authorId: userData._id,
                    authorName: userData.name,
                    authorSurname: userData.surname,
                    creationDate: new Date(),
                    numberOfPages: n
                }),
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                }
            };

            fetch(url, options)
                .then((response) => {
                    console.log(response.status);

                    if (response.status === 200) {
                        response.json().then((data) => {
                            // Work with JSON data here

                            const url2 = 'https://notedealer-api.herokuapp.com/files';
                            //const fileUri = doc.uri;
                            const formData = new FormData();
                            formData.append('parentId', data.insertedId);

                            for (let i = 1; i <= n; i++) {
                                formData.append('uploadedFiles', images[i]);
                            }

                            const options2 = {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    Accept: 'application/json',
                                    'content-type': 'multipart/form-data'
                                }
                            };

                            fetch(url2, options2)
                                .then((response) => {
                                    setIsLoading(false);
                                    console.log(response.status);
                                    if (response.status === 201) {
                                        showMessage({
                                            message: 'Dodano notatkę',
                                            type: 'success'
                                        });
                                        navigation.navigate('Added');
                                        setImages(['button']);
                                        setN(0);
                                        setTitle('');
                                        setSchool(userData.school);
                                        setMajor(userData.major);
                                        setPrice('');
                                        setYear('');
                                        setSubject('');
                                    }
                                })
                                .catch((error) => {
                                    setIsLoading(false);
                                    console.log(error);
                                });
                        });
                    } else setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }
    };

    const send = () => {
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
                postDocument();
            } else if (response.status === 400) {
                showMessage({
                    message: 'Podaj numer konta',
                    type: 'danger'
                });
                navigation.push('AccountForm');
            }
        });
    };

    function getPreview(uri) {
        setPreview(uri);
        setModalVisible(true);
    }

    function deleteImage(index) {
        setRefresh(true);
        images.splice(index + 1, 1);
        for (let i = index + 1; i < n; i++) {
            images[i].index--;
        }
        setN(n - 1);
        setRefresh(false);
    }

    const renderItem = ({item}) => {
        if (item === 'button') {
            return (
                <View
                    style={{
                        width: 95,
                        height: 100,
                        marginTop: 10,
                        marginLeft: 5,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <NeomorphBox style={styles.buttonAdd}>
                        <TouchableOpacity
                            style={{height: '100%', width: '100%', justifyContent: 'center',
                                alignItems: 'center'}}
                            onPress={canPickDocument}
                            activeOpacity={0.75}
                        >
                            <Image source={navbar_add_button} style={{width: 75, height: 75}}/>
                        </TouchableOpacity>
                    </NeomorphBox>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    style = {{width: 95, height: 100, marginLeft: 5, alignSelf: 'center'}}
                    onPress={() => getPreview(item.uri)}
                    onLongPress={() =>
                        Alert.alert('Uwaga', 'Czy chcesz usunąć dodany obrazek?', [
                            {
                                text: 'Anuluj',
                                onPress: () => null,
                                style: 'cancel'
                            },
                            {text: 'TAK', onPress: () => deleteImage(item.index)}
                        ])
                    }
                >
                    <Item uri={item.uri} index={item.index}/>
                </TouchableOpacity>
            );
        }
    };

    if (modalVisible) {
        return (
            <ImageView
                images={[{uri: preview}]}
                imageIndex={0}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            />
        );
    } else if (!modalVisible) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{alignSelf: 'stretch'}}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation}/>
                        </View>
                        <ScrollView
                            horizontal={false}
                            style={{marginTop: 100}}
                            removeClippedSubviews={true}
                        >
                            <View>
                                <Text style={styles.title2}>Dodaj notatkę</Text>
                            </View>
                            <View style={styles.textInputMargin}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={styles.neuInner}
                                >
                                    <InputOutlineComponent
                                        placeholder="Tytuł"
                                        value={title}
                                        onChangeText={setTitle}
                                    />
                                </NeomorphBox>
                            </View>
                            <View>
                                <Text style={styles.title2}>Przesłane pliki</Text>
                            </View>
                            <View style={styles.textInputMargin}>
                                <NeomorphBox
                                    style={
                                        n < 3
                                            ? styles.neuImages1
                                            : n >= 3 && n < 6
                                                ? styles.neuImages2
                                                : n >= 6 && n < 9
                                                    ? styles.neuImages3
                                                    : n >= 9 && n < 12
                                                        ? styles.neuImages4
                                                        : styles.neuImages5
                                    }
                                >
                                    <ScrollView
                                        horizontal={true}
                                        style={{width: '100%', marginRight: 10}}
                                        scrollEnabled={false}
                                    >
                                        <FlatList
                                            data={images}
                                            renderItem={renderItem}
                                            extraData={refresh}
                                            horizontal={false}
                                            numColumns={3}
                                            keyExtractor={(item) => item.name}
                                            style={{width: '100%', alignSelf: 'center', marginLeft: 10}}
                                        />
                                    </ScrollView>
                                </NeomorphBox>
                            </View>
                            <View>
                                <Text style={styles.title2}>Szczegóły</Text>
                            </View>
                            <View style={styles.textInputMargin}>
                                <NeomorphBox
                                    inner
                                    lightShadowColor="#ffffff"
                                    darkShadowColor="#bec8d2"
                                    style={styles.neuInner}
                                >
                                    <InputOutlineComponent
                                        placeholder="Uczelnia"
                                        value={school}
                                        onChangeText={setSchool}
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
                                        placeholder="Rok studiów"
                                        value={year}
                                        onChangeText={setYear}
                                        keyboardType="numeric"
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
                                        placeholder="Kierunek"
                                        value={major}
                                        onChangeText={setMajor}
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
                                        placeholder="Przedmiot"
                                        value={subject}
                                        onChangeText={setSubject}
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
                                        placeholder="Cena"
                                        value={price}
                                        onChangeText={setPrice}
                                        keyboardType="numeric"
                                    />
                                </NeomorphBox>
                            </View>

                            <View
                                style={
                                    keyboardStatus === 'Keyboard Shown'
                                        ? {marginBottom: 350}
                                        : {marginBottom: 100}
                                }
                            >
                                <ButtonComponent
                                    title="Dodaj"
                                    onPress={() => send()}
                                    disabled={isLoading}
                                />
                            </View>
                        </ScrollView>
                        <NavbarComponent navigation={navigation} addButtonActive={true}/>
                        {isLoading ? <ActivityComponent /> : null}
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
