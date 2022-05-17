import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import styles from '../styles';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector} from 'react-redux';

export function DrawerContent({ navigation }) {
    const userAvatar = useSelector((state) => state.userAvatar);
    const userData = useSelector((state) => state.userData);

    return (
        <View style={styles.drawerBody}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.drawerProfilePictureMargin}>
                        <NeomorphBox style={styles.drawerNeuProfilePicture}>
                            {
                                userAvatar.fileUri !== '' ?
                                    <Image
                                        source={{uri: userAvatar.fileUri}}
                                        style={{
                                            width: 66,
                                            height: 66,
                                            borderRadius: 12,
                                            marginTop: 2,
                                            marginLeft: 2
                                        }}
                                    />
                                    :
                                    <FontAwesome5
                                        name={"user-alt"}
                                        color={"grey"}
                                        size={66}

                                    />

                            }
                        </NeomorphBox>
                    </View>
                    <View style={styles.drawerUserInfo}>
                        <Text style={styles.drawerTittle}>
                            {userData.name} {userData.surname}
                        </Text>
                        {userData.nickname ? (
                            <Text style={styles.drawerCaption}>{userData.nickname}</Text>
                        ) : null}
                        <Text style={styles.drawerCaption}>{userData.email}</Text>
                    </View>
                </View>
                <View>
                    <View styles>
                        <DrawerItem
                            label="Kupione notatki"
                            onPress={() => navigation.navigate('Bought')}
                            style={{
                                width: '90%',
                                marginLeft: 10,
                                marginTop: -5,
                                marginBottom: -10
                            }}
                            labelStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            icon={({}) => (
                                <FontAwesome5 name="search-dollar" size={24} color="black" />
                            )}
                        />
                    </View>
                    <Image
                        source={require('../assets/spacer.png')}
                        resizeMode="contain"
                        style={{
                            width: '90%',
                            marginLeft: 10
                        }}
                    />
                    <View>
                        <DrawerItem
                            label="Dodane notatki"
                            onPress={() => navigation.navigate('Added')}
                            style={{
                                width: '90%',
                                marginLeft: 10,
                                marginTop: -10,
                                marginBottom: -10
                            }}
                            labelStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            icon={({}) => (
                                <FontAwesome5 name="search-plus" size={24} color="black" />
                            )}
                        />
                    </View>
                    <Image
                        source={require('../assets/spacer.png')}
                        resizeMode="contain"
                        style={{
                            width: '90%',
                            marginLeft: 10
                        }}
                    />
                    <View>
                        <DrawerItem
                            label="Profil"
                            onPress={() => navigation.navigate('Profile')}
                            style={{
                                width: '90%',
                                marginLeft: 10,
                                marginTop: -10,
                                marginBottom: -10
                            }}
                            labelStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            icon={({}) => (
                                <FontAwesome5 name="user-circle" size={24} color="black" />
                            )}
                        />
                    </View>
                    <Image
                        source={require('../assets/spacer.png')}
                        resizeMode="contain"
                        style={{
                            width: '90%',
                            marginLeft: 10
                        }}
                    />
                    <View>
                        <DrawerItem
                            label="Ustawienia"
                            onPress={() => navigation.navigate('Settings')}
                            labelStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            style={{
                                width: '90%',
                                marginLeft: 10,
                                marginTop: -10,
                                marginBottom: -10
                            }}
                            icon={({}) => <FontAwesome5 name="cog" size={24} color="black" />}
                        />
                    </View>
                    <Image
                        source={require('../assets/spacer.png')}
                        resizeMode="contain"
                        style={{
                            width: '90%',
                            marginLeft: 10
                        }}
                    />
                    <View>
                        <DrawerItem
                            label="Wyloguj się"
                            onPress={() => navigation.navigate('Login')}
                            labelStyle={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                            style={{
                                width: '90%',
                                marginLeft: 10,
                                marginTop: -10
                            }}
                            icon={({}) => (
                                <FontAwesome5 name="sign-out-alt" size={24} color="black" />
                            )}
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}
