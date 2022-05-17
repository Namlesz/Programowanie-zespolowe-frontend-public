import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import styles from '../styles';
import { user } from './LoginEmail';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { setUserData } from '../utils/userSlice';
import { setUserAvatar } from '../utils/userAvatarSlice';
import LoadingComponent from "../components/loadingComponent";

let user2;
let filename;

let DATAADDED;

function setDATAADDED(value) {
    DATAADDED = value;
}

let DATABOUGHT;

function setDATABOUGHT(value) {
    DATABOUGHT = value;
}

export { DATAADDED, setDATAADDED, DATABOUGHT, setDATABOUGHT };

export default function LoadingScreen({ navigation }) {
    const dispatch = useDispatch();
    function getUserInfo() {
        fetch('https://notedealer-api.herokuapp.com/userInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: user._id
            })
        })
            .then((response) => {
                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            // Work with JSON data here
                            user2 = data;
                            dispatch(setUserData(data));

                            if (filename) {
                                FileSystem.deleteAsync(filename).then();
                            }

                            if (data.avatar) {
                                filename =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(filename, data.avatar.image, {
                                    encoding: FileSystem.EncodingType.Base64
                                }).then();
                                dispatch(setUserAvatar(filename));
                            } else {
                                dispatch(setUserAvatar(""));
                            }
                        })
                        .then(() => getAddedNotes());
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

    function getAddedNotes() {
        fetch('https://notedealer-api.herokuapp.com/getLastAddedNotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user._id,
                n: 10
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATAADDED(data);
            })
            .then(() => getBoughtNotes())
            .catch((error) => {
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });
    }

    function getBoughtNotes() {
        fetch('https://notedealer-api.herokuapp.com/getLastBoughtNotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user._id,
                n: 10
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATABOUGHT(data);
            })
            .then(() => navigation.navigate('DrawerNav'))
            .catch((error) => {
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });
    }

    getUserInfo();

    return (
        <LoadingComponent/>
    );
}
