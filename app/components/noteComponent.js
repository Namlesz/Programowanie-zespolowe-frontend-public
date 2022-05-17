import React from 'react';
import { View, Text } from 'react-native';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import StarComponent from '../components/starComponent'

const note_background = require('../assets/note_background.png');

const Item = ({ title, year, price, authorName, authorSurname, rating }) => (
    <View style={styles.searchCenter}>
        <View style={styles.searchButtonMargin}>
            <NeomorphBox style={styles.neuNoteBox}>
                <View style={styles.searchNoteInfo}>
                    <View style={styles.searchImageContainer}>
                        <Image source={note_background} style={styles.searchImageBoxBackground} />
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
            </NeomorphBox>
        </View>
    </View>
);

export default React.memo(Item);
