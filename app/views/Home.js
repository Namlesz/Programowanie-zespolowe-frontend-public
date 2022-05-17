import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    BackHandler,
    Alert,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteId } from '../utils/noteIdSlice';
import { DATAADDED, setDATAADDED, DATABOUGHT, setDATABOUGHT } from './Loading';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import StarComponent from '../components/starComponent';

const note_background = require('../assets/note_background.png');

export default function HomeScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [refresh, setRefresh] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert('Zaczekaj!', 'Czy na pewno chcesz opuścić aplikację?', [
                    {
                        text: 'Anuluj',
                        onPress: () => null,
                        style: 'cancel'
                    },
                    { text: 'TAK', onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    function goToNote(id) {
        dispatch(setNoteId(id));
        navigation.push('Details');
    }

    function getAddedNotes() {
        setRefresh(true);
        fetch('https://notedealer-api.herokuapp.com/getLastAddedNotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                n: 10
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATAADDED(data);
                console.log(setDATAADDED);
            })
            .then(() => getBoughtNotes());
    }

    function getBoughtNotes() {
        setRefresh(true);
        fetch('https://notedealer-api.herokuapp.com/getLastBoughtNotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                n: 10
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATABOUGHT(data);
            })
            .then(() => setRefresh(false));
    }

    const Item = ({ title, year, price, authorName, authorSurname, id, rating }) => (
        <View style={styles.homeCenter}>
            <View style={styles.searchButtonMargin}>
                <NeomorphBox style={styles.neuNoteBoxHome}>
                    <TouchableOpacity onPress={() => goToNote(id)} activeOpacity={0.75}>
                        <View style={styles.searchNoteInfo}>
                            <View style={styles.searchImageContainer}>
                                <Image
                                    source={note_background}
                                    style={styles.searchImageBoxBackground}
                                />
                            </View>
                            <View style={styles.searchInfoContainer}>
                                <View style={styles.searchTittleContainer}>
                                    <Text style={styles.searchTextTittle} numberOfLines={1}>
                                        {title}
                                    </Text>
                                </View>
                                <StarComponent
                                    rating={rating}
                                    style={styles.ratingSearch}
                                />

                                <View style={styles.searchTittleContainer}>
                                    <Text style={styles.text2v2}>
                                        Autor: {authorName} {authorSurname}
                                    </Text>
                                </View>
                                <View style={styles.searchNotePrice}>
                                    <Text style={styles.searchText1}>Rok studiów: {year}</Text>
                                    <Text style={styles.textSearchPrice}>{price}zł</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </NeomorphBox>
            </View>
        </View>
    );

    const renderItemAdded = ({ item }) => (
        <Item
            title={item.title}
            school={item.school}
            year={item.year}
            subject={item.subject}
            major={item.major}
            price={item.price}
            authorName={item.authorName}
            authorSurname={item.authorSurname}
            id={item._id}
            rating={item.rating}
        />
    );

    const Item1 = ({ title, year, authorName, authorSurname, id, rating }) => (
        <View style={styles.homeCenter}>
            <View style={styles.searchButtonMargin}>
                <NeomorphBox style={styles.neuNoteBoxHome}>
                    <View style={{ display: 'flex' }}>
                        <TouchableOpacity
                            style={{ height: 155 }}
                            onPress={() => goToNote(id)}
                            activeOpacity={0.75}
                        >
                            <View style={styles.searchNoteInfo}>
                                <View style={styles.searchImageContainer}>
                                    <Image
                                        source={note_background}
                                        style={styles.searchImageBoxBackground}
                                    />
                                </View>
                                <View style={styles.searchInfoContainer}>
                                    <View style={styles.searchTittleContainer}>
                                        <Text style={styles.searchTextTittle} numberOfLines={1}>
                                            {title}
                                        </Text>
                                    </View>
                                    <StarComponent
                                        rating={rating}
                                        style={styles.ratingSearch}
                                    />
                                    <View style={styles.searchTittleContainer}>
                                        <Text style={styles.text2v2}>
                                            Autor: {authorName} {authorSurname}
                                        </Text>
                                    </View>
                                    <View style={styles.searchNotePrice}>
                                        <Text style={styles.searchText1}>Rok studiów: {year}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </NeomorphBox>
            </View>
        </View>
    );

    const renderItemBought = ({ item }) => (
        <Item1
            title={item.title}
            year={item.year}
            authorName={item.authorName}
            authorSurname={item.authorSurname}
            id={item.noteId}
            rating={item.rating}
        />
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ alignSelf: 'stretch' }}>
                <View style={styles.containerInner}>
                    <View style={styles.center}>
                        <HeaderBarComponent navigation={navigation} />
                    </View>
                    <ScrollView
                        horizontal={false}
                        style={{ display: 'flex', marginTop: 80, marginBottom: 80 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    getBoughtNotes();
                                    getAddedNotes();
                                }}
                            />
                        }
                    >
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.title2home}>Cześć, </Text>
                                <Text style={styles.title2red}>{userData.name}</Text>
                            </View>
                            <Text style={styles.text6}>Miło Cię widzieć</Text>
                        </View>
                        <Text style={styles.title2}>Ostatnio dodane</Text>
                        <FlatList
                            data={DATAADDED}
                            extraData={refresh}
                            renderItem={renderItemAdded}
                            keyExtractor={(item) => item._id}
                            refreshing={false}
                            horizontal={true}
                            onRefresh={() => getAddedNotes()}
                            removeClippedSubviews={true}
                            nestedScrollEnabled
                            ListFooterComponent={() => (
                                <View style={styles.homeCenter}>
                                    <View style={styles.searchButtonMargin}>
                                        <NeomorphBox style={styles.neuNoteBoxHome1}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Added')}
                                                activeOpacity={0.75}
                                            >
                                                <Text style={styles.text1}>Zobacz więcej</Text>
                                            </TouchableOpacity>
                                        </NeomorphBox>
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.homeCenter}>
                                    <View style={styles.searchButtonMargin}>
                                        <NeomorphBox style={styles.neuNoteBoxHome1}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Add')}
                                                activeOpacity={0.75}
                                            >
                                                <Text style={styles.text1}>
                                                    Pusto, dodaj notatke
                                                </Text>
                                            </TouchableOpacity>
                                        </NeomorphBox>
                                    </View>
                                </View>
                            )}
                        />
                        <Text style={styles.title2}>Ostanio kupione</Text>
                        <FlatList
                            data={DATABOUGHT}
                            extraData={refresh}
                            renderItem={renderItemBought}
                            keyExtractor={(item) => item.noteId}
                            refreshing={false}
                            horizontal={true}
                            onRefresh={() => getBoughtNotes()}
                            removeClippedSubviews={true}
                            nestedScrollEnabled
                            ListFooterComponent={() => (
                                <View style={styles.homeCenter}>
                                    <View style={styles.searchButtonMargin}>
                                        <NeomorphBox style={styles.neuNoteBoxHome1}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Bought')}
                                                activeOpacity={0.75}
                                            >
                                                <Text style={styles.text1}>Zobacz więcej</Text>
                                            </TouchableOpacity>
                                        </NeomorphBox>
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.homeCenter}>
                                    <View style={styles.searchButtonMargin}>
                                        <NeomorphBox style={styles.neuNoteBoxHome1}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Search')}
                                                activeOpacity={0.75}
                                            >
                                                <Text style={styles.text1}>Pusto, kup notatke</Text>
                                            </TouchableOpacity>
                                        </NeomorphBox>
                                    </View>
                                </View>
                            )}
                        />
                    </ScrollView>
                    <NavbarComponent homeButtonActive={true} navigation={navigation} />
                </View>
            </SafeAreaView>
        </View>
    );
}
