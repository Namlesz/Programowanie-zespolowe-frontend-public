import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import {notWorking} from '../utils/alert'

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ alignSelf: 'stretch' }}>
                <View style={styles.containerInner}>
                    <View style={styles.center}>
                        <HeaderBarComponent navigation={navigation} />
                        <View>
                            <Text style={styles.title3}>Ustawienia</Text>

                            <View style={styles.buttonMargin2v2}>
                                <NeomorphBox style={styles.neuButtonBoxSettings}>
                                    <View style={styles.buttonMargin3v2}>
                                        <TouchableOpacity onPress={() => notWorking()}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text4v2}>
                                                    Dostosuj powiadomienia
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
                                        style={{ width: '90%', marginTop: -10, marginBottom: -10 }}
                                    />
                                    <View style={styles.buttonMargin3v2}>
                                        <TouchableOpacity onPress={() => notWorking()}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text4v2}>Wybierz motyw</Text>
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
                                        style={{ width: '90%', marginTop: -10, marginBottom: -10 }}
                                    />
                                    <View style={styles.buttonMargin3v2}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Cards')}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.text4v2}>Karty płatnicze</Text>
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
                        </View>
                    </View>
                    <NavbarComponent navigation={navigation} />
                </View>
            </SafeAreaView>
        </View>
    );
}
