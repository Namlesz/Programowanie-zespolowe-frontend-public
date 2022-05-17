import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import * as FileSystem from 'expo-file-system';
import { useDispatch } from 'react-redux';
import { setNoteId } from '../utils/noteIdSlice';
import { authorId } from './Details';
import HeaderBarComponent from '../components/headerBarComponent';
import styles from '../styles';
import NavbarComponent from '../components/navbarComponent';
import Item from '../components/noteComponent';
import LoadingComponent from "../components/loadingComponent";
import { FontAwesome5 } from '@expo/vector-icons';
import StarComponent from '../components/starComponent';


let user3;

function setUser3(data) {
    user3 = data;
}

export { user3, setUser3 };

let DATA;

function setDATA(value) {
    DATA = value;
}

export { DATA, setDATA };

let filename;

function setFilename(file) {
    filename = file;
}

export default function ProfilePublicScreen({ navigation }) {
    const dispatch = useDispatch();
    const [dataAvalible, setdataAvalible] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getUserInfo();
        });
    }, [navigation]);

    function getUserInfo() {
        setRefresh(true);
        fetch('https://notedealer-api.herokuapp.com/userInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: authorId
            })
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            setUser3(data);
                            if (filename) {
                                FileSystem.deleteAsync(filename);
                            }

                            if (user3.avatar) {
                                let file =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(file, user3.avatar.image, {
                                    encoding: FileSystem.EncodingType.Base64
                                });
                                setFilename(file);
                            }
                            getNotes();
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

    function getNotes() {
        fetch('https://notedealer-api.herokuapp.com/getAllNotesInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorName: user3.name,
                authorSurname: user3.surname
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATA(data);
            })
            .then(() => setRefresh(false))
            .then(() => setdataAvalible(true));
    }

    function goToNote(id) {
        dispatch(setNoteId(id));
        navigation.push('Details');
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => goToNote(item._id)} activeOpacity={0.75}>
                <Item
                    title={item.title}
                    school={item.school}
                    major={item.major}
                    year={item.year}
                    subject={item.subject}
                    price={item.price}
                    authorName={item.authorName}
                    authorSurname={item.authorSurname}
                    id={item._id}
                    rating={item.rating}
                />
            </TouchableOpacity>
        );
    };

    if (dataAvalible) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation} />
                            <View>
                                <FlatList
                                    data={DATA}
                                    extraData={refresh}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item._id}
                                    refreshing={false}
                                    style={{ marginTop: 85, marginBottom: 55 }}
                                    onRefresh={() => getNotes()}
                                    removeClippedSubviews={true}
                                    nestedScrollEnabled
                                    ListHeaderComponent={() => (
                                        <View>
                                            <View style={styles.profilePictureMargin}>
                                                <NeomorphBox style={styles.neuProfilePicture}>
                                                    {
                                                        user3.avatar?
                                                            <Image
                                                                source={{uri: filename}}
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
                                                </NeomorphBox>
                                            </View>
                                            <View style={styles.buttonMargin}>
                                                <Text style={styles.text1v2}>
                                                    {user3.name} {user3.surname}
                                                </Text>
                                                {user3.nickname ? (
                                                    <Text style={styles.text2}>
                                                        {user3.nickname}
                                                    </Text>
                                                ) : null}
                                                <Text style={styles.text2}>{user3.email}</Text>
                                                {user3.school && !user3.major ? (
                                                    <Text style={styles.text2}>{user3.school}</Text>
                                                ) : null}
                                                {user3.major && !user3.school ? (
                                                    <Text style={styles.text2}>{user3.major}</Text>
                                                ) : null}
                                                {user3.major && user3.school ? (
                                                    <Text style={styles.text2}>
                                                        {user3.school}/{user3.major}
                                                    </Text>
                                                ) : null}
                                            </View>

                                            <View style={styles.buttonMargin}>
                                                <NeomorphBox style={styles.neuRatingBox}>
                                                    <Text style={styles.text1v2}>
                                                        Ocena profilu
                                                    </Text>
                                                    <StarComponent
                                                        rating={user3.rating}
                                                        style={styles.rating}
                                                    />
                                                </NeomorphBox>
                                            </View>
                                            <Text style={styles.title2}>
                                                Dodane notatki użytkownika
                                            </Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <NavbarComponent navigation={navigation} />
            </View>
        );
    } else {
        return (<LoadingComponent navigation={navigation}/>);
    }
}
