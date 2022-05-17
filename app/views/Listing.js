import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteId } from '../utils/noteIdSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';

import Item from '../components/noteComponent';
import LoadingComponent from '../components/loadingComponent';

let DATA;

function setDATA(value) {
    DATA = value;
}

export default function ListingScreen({ navigation }) {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search.value);
    const [refresh, setRefresh] = React.useState(false);
    const [dataAvailable, setDataAvailable] = useState(false);

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getNotes();
        });
    }, [navigation]);

    function getNotes() {
        setRefresh(true);
        fetch('https://notedealer-api.herokuapp.com/getNotesPreviewByTitle', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: search.payload
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATA(data);
            })
            .then(() => setRefresh(false))
            .then(() => setDataAvailable(true));
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

    if (dataAvailable) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <View>
                                <HeaderBarComponent navigation={navigation} />
                                <FlatList
                                    data={DATA}
                                    extraData={refresh}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item._id}
                                    refreshing={false}
                                    style={{ marginTop: 85, marginBottom: 55 }}
                                    onRefresh={() => getNotes()}
                                    removeClippedSubviews={true}
                                    ListHeaderComponent={() => (
                                        <Text style={styles.title2}>Lista wyników</Text>
                                    )}
                                    ListEmptyComponent={() => (
                                        <Text style={styles.text1}>Brak wyników</Text>
                                    )}
                                />
                            </View>
                        </View>
                        <NavbarComponent navigation={navigation} />
                    </View>
                </SafeAreaView>
            </View>
        );
    } else {
        return <LoadingComponent />;
    }
}
