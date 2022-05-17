import React from 'react';
import { View, TouchableOpacity, Text, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteId } from '../utils/noteIdSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import Item from '../components/noteComponent';
import LoadingComponent from "../components/loadingComponent";

let DATA2;

function setDATA2(value) {
    DATA2 = value;
}

export { DATA2, setDATA2 };

export default function AddedScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [dataAvailable, setDataAvailable] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    function getNotes() {
        setRefresh(true);

        fetch('https://notedealer-api.herokuapp.com/getLastAddedNotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                n: 100
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setDATA2(data);
            })
            .then(() => setDataAvailable(true))
            .then(() => setRefresh(false));
    }

    function goToNote(id) {
        dispatch(setNoteId(id));
        navigation.push('Details');
    }

    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getNotes();
        });
    }, [navigation]);

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
                            <HeaderBarComponent navigation={navigation} />
                            <FlatList
                                data={DATA2}
                                extraData={refresh}
                                renderItem={renderItem}
                                keyExtractor={(item) => item._id}
                                refreshing={false}
                                style={{ marginTop: 85, width: '100%' }}
                                onRefresh={() => getNotes()}
                                removeClippedSubviews={true}
                                ListHeaderComponent={() => (
                                    <Text style={styles.title2}>Dodane notatki</Text>
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
