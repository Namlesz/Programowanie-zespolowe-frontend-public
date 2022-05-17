import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector } from 'react-redux';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import LoadingComponent from '../components/loadingComponent';
import ButtonComponent from '../components/buttonComponent'

let cards;

function setCards(data) {
    cards = data;
}

export default function CardsScreen({ navigation }) {
    const userData = useSelector((state) => state.userData);
    const [dataAvalible, setdataAvalible] = useState(false);
    const [refresh, setRefresh] = React.useState(false);

    function getCards() {
        setdataAvalible(false);
        fetch('https://notedealer-api.herokuapp.com/creditCards/'+userData._id)
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            setCards(data.creditCards);
                        })
                        .then(() => setdataAvalible(true));
                } else if (response.status === 400) {
                    setCards([]);
                    setdataAvalible(true);
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
            getCards();
        });
    }, [navigation]);

    function deleteCard(number) {
        fetch('https://notedealer-api.herokuapp.com/removeCardData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userData._id,
                card_number: number
            })
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    getCards();
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

    const Item = ({ cardNumber }) => (
        <View style={styles.searchCenter}>
            <View style={styles.searchButtonMargin}>
                <NeomorphBox style={styles.neuCardBox}>
                    <View style={styles.center}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onLongPress={() =>
                                Alert.alert('Uwaga', 'Czy chcesz usunąć kartę?', [
                                    {
                                        text: 'Anuluj',
                                        onPress: () => null,
                                        style: 'cancel'
                                    },
                                    { text: 'TAK', onPress: () => deleteCard(cardNumber) }
                                ])
                            }
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text4v3}>
                                    Karta z końcówką {cardNumber.substring(cardNumber.length - 4)}
                                </Text>
                                <Image
                                    source={require('../assets/accept.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 10,
                                        marginLeft: -60
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </NeomorphBox>
            </View>
        </View>
    );

    const renderItem = ({ item }) => {
        return (
            <Item
                id={item.creditCard._id}
                cardNumber={item.creditCard.card_number}
                ccv={item.creditCard.ccv}
                owner={item.creditCard.owner}
                expiresIn={item.creditCard.expires}
            />
        );
    };

    if (dataAvalible) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation} />
                            <FlatList
                                data={cards}
                                extraData={refresh}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.creditCard.card_number}
                                refreshing={false}
                                style={{ marginTop: 85, marginBottom: 55 }}
                                onRefresh={() => getCards()}
                                removeClippedSubviews={true}
                                ListHeaderComponent={() => <Text style={styles.title2}>Karty</Text>}
                                ListEmptyComponent={() => (
                                    <Text style={styles.text1}>Brak kart</Text>
                                )}
                                ListFooterComponent={() => (
                                    <View style={styles.buttonMargin4}>
                                        <ButtonComponent
                                            title="Dodaj kartę"
                                            onPress={() => navigation.navigate('CardForm')}
                                        />
                                    </View>
                                )}
                            />
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
