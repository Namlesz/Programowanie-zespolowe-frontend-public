import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteId } from '../utils/noteIdSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import LoadingComponent from "../components/loadingComponent";
import StarComponent from "../components/starComponent";

const note_background = require('../assets/note_background.png');

let DATA3;

function setDATA3(value) {
    DATA3 = value;
}

export { DATA3, setDATA3 };

export default function BoughtScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [dataAvailable, setDataAvailable] = useState(false);
    const [refresh, setRefresh] = React.useState(false);

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
                n: 100
            })
        }).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response
                    .json()
                    .then((data) => {
                        setDATA3(data);
                    })
                    .then(() => setDataAvailable(true))
                    .then(() => setRefresh(false));
            }
            if (response.status !== 200) {
                setDataAvailable(true);
                setRefresh(false);
            }
        });
    }

    function goToNote(id) {
        dispatch(setNoteId(id));
        navigation.push('Details');
    }

    function rate(id) {
        dispatch(setNoteId(id));
        navigation.navigate('CommentForm');
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getBoughtNotes();
        });
    }, [navigation]);

    const Item = ({ title, year, price, authorName, authorSurname, id, rating }) => (
        <View style={styles.searchCenter}>
            <View style={styles.searchButtonMargin}>
                <NeomorphBox style={styles.neuNoteBox1}>
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
                                        <Text style={styles.searchTextTittle}>{title}</Text>
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
                        <View style={styles.neuNoteBoxButtonRow}>
                            <TouchableOpacity onPress={() => rate(id)} activeOpacity={0.75}>
                                <View style={styles.neuNoteBoxButton1}>
                                    <Text style={styles.text5v1}>Oceń</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </NeomorphBox>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item
            title={item.title}
            year={item.year}
            authorName={item.authorName}
            authorSurname={item.authorSurname}
            id={item.noteId}
            rating={item.rating}
        />
    );

    if (dataAvailable) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation} />
                            <FlatList
                                data={DATA3}
                                extraData={refresh}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.noteId}
                                refreshing={false}
                                style={{ marginTop: 85, marginBottom: 55, width: '100%' }}
                                onRefresh={() => getBoughtNotes()}
                                removeClippedSubviews={true}
                                ListHeaderComponent={() => (
                                    <Text style={styles.title2}>Kupione notatki</Text>
                                )}
                                ListHeaderComponentStyle={{ width: '100%' }}
                                ListEmptyComponent={() => (
                                    <Text style={styles.text1}>Brak wyników</Text>
                                )}
                            />
                        </View>
                        <NavbarComponent navigation={navigation} />
                    </View>
                </SafeAreaView>
            </View>
        );
    } else {
        return (<LoadingComponent />);
    }
}
