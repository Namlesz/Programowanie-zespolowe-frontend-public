import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image, RefreshControl} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import * as FileSystem from 'expo-file-system';
import styles from '../styles';
import {useSelector, useDispatch} from 'react-redux';
import {setUserData} from '../utils/userSlice';
import {setUserAvatar} from '../utils/userAvatarSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import { FontAwesome5 } from '@expo/vector-icons';
import StarComponent from '../components/starComponent';

export default function ProfileScreen({navigation}) {
    const userAvatar = useSelector((state) => state.userAvatar);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = React.useState(false);

    function getUserInfo() {
        setRefresh(true);
        fetch('https://notedealer-api.herokuapp.com/userInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userData._id
            })
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            dispatch(setUserData(data));

                            if (userAvatar.fileUri) {
                                FileSystem.deleteAsync(userAvatar.fileUri);
                            }

                            if (userAvatar.fileUri !== '') {
                                let file =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(file, data.avatar.image, {
                                    encoding: FileSystem.EncodingType.Base64
                                });
                                dispatch(setUserAvatar(file));
                            }
                        })
                        .then(() => setRefresh(false));
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
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => getUserInfo()}/>
                        }
                    >
                        <View style={styles.profilePictureMargin}>
                            <NeomorphBox style={styles.neuProfilePicture}>
                                <TouchableOpacity onPress={() => navigation.navigate('AvatarForm')}>
                                    {
                                    userAvatar.fileUri !== '' ?
                                    <Image
                                        source={{uri: userAvatar.fileUri}}
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

                        <View style={styles.buttonMargin}>
                            <Text style={styles.text1v2}>
                                {userData.name} {userData.surname}
                            </Text>
                            {userData.nickname ? (
                                <Text style={styles.text2}>{userData.nickname}</Text>
                            ) : null}
                            <Text style={styles.text2}>{userData.email}</Text>
                            {userData.school && !userData.major ? (
                                <Text style={styles.text2}>{userData.school}</Text>
                            ) : null}
                            {userData.major && !userData.school ? (
                                <Text style={styles.text2}>{userData.major}</Text>
                            ) : null}
                            {userData.major && userData.school ? (
                                <Text style={styles.text2}>
                                    {userData.school}/{userData.major}
                                </Text>
                            ) : null}
                        </View>
                        <View style={styles.buttonMargin}>
                            <NeomorphBox style={styles.neuRatingBox}>
                                <Text style={styles.text1v2}>Ocena profilu</Text>
                                <StarComponent
                                    rating={userData.rating}
                                    style={styles.rating}
                                />
                            </NeomorphBox>
                        </View>

                        <View style={styles.buttonMargin2}>
                            <NeomorphBox style={styles.neuButtonBox}>
                                <View style={styles.buttonMargin3}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('NickForm')}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text4v2}>Zmień pseudonim</Text>
                                            <Image
                                                source={require('../assets/arrow.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 50,
                                                    marginLeft: -60
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={require('../assets/spacer.png')}
                                    resizeMode="contain"
                                    style={{width: '90%'}}
                                />
                                <View style={styles.buttonMargin3}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AccountForm')}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text4v2}>
                                                Zmień/dodaj numer konta
                                            </Text>
                                            <Image
                                                source={require('../assets/arrow.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 50,
                                                    marginLeft: -60
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={require('../assets/spacer.png')}
                                    resizeMode="contain"
                                    style={{width: '90%'}}
                                />
                                <View style={styles.buttonMargin3}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AvatarForm')}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text4v2}>
                                                Zmień zdjęcie profilowe
                                            </Text>
                                            <Image
                                                source={require('../assets/arrow.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 50,
                                                    marginLeft: -60
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={require('../assets/spacer.png')}
                                    resizeMode="contain"
                                    style={{width: '90%'}}
                                />
                                <View style={styles.buttonMargin3}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SchoolForm')}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text4v2}>
                                                Zmień uczelnie i kierunek
                                            </Text>
                                            <Image
                                                source={require('../assets/arrow.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 50,
                                                    marginLeft: -60
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={require('../assets/spacer.png')}
                                    resizeMode="contain"
                                    style={{width: '90%'}}
                                />
                                <View style={styles.buttonMargin3}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PasswordForm')}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text4v2}>Zmień hasło</Text>
                                            <Image
                                                source={require('../assets/arrow.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 50,
                                                    marginLeft: -60
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </NeomorphBox>
                        </View>
                    </ScrollView>
                    <NavbarComponent navigation={navigation}/>
                </View>
            </SafeAreaView>
        </View>
    );
}
