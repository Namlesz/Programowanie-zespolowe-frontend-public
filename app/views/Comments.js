import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { setCommentData } from '../utils/commentSlice';
import { comments, setComments } from './Details';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import LoadingComponent from "../components/loadingComponent";
import StarComponent from "../components/starComponent";

export default function CommentsScreen({ navigation }) {
    const noteId = useSelector((state) => state.noteId.value);
    const dispatch = useDispatch();
    const [dataAvalible, setDataAvailable] = useState(true);
    const [refresh, setRefresh] = React.useState(false);

    function getComments() {
        fetch('https://notedealer-api.herokuapp.com/note/comments/'+noteId.payload)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .then(() => setDataAvailable(true));
    }

    function selectComment(comment) {
        dispatch(setCommentData(comment));

        navigation.navigate('CommentDetails');
    }

    const Item = ({ authorName, authorSurname, creationDate, content, rating }) => (
        <View style={styles.searchCenter}>
            <View style={styles.commentMargin}>
                {content === "" ? (
                    <NeomorphBox style={styles.neuCommentBoxSmall}>
                        <View style={styles.commentBox}>
                            <View style={styles.commentAuthor}>
                                <Text style={styles.commentText}>
                                    {' '}
                                    {authorName} {authorSurname}
                                </Text>
                                <StarComponent
                                    rating={rating}
                                    style={styles.ratingSearch3}
                                />
                            </View>
                        </View>
                        <Text style={styles.commentText1}> {creationDate}</Text>
                    </NeomorphBox>

                ) : (
                    <NeomorphBox style={styles.neuCommentBox}>
                        <View style={styles.commentBox}>
                            <View style={styles.commentAuthor}>
                                <Text style={styles.commentText}>
                                    {' '}
                                    {authorName} {authorSurname}
                                </Text>
                                <StarComponent
                                    rating={rating}
                                    style={styles.ratingSearch3}
                                />
                            </View>
                            <View style={styles.commentContent}>
                                <Text style={styles.commentText}>{content}</Text>
                            </View>
                        </View>
                        <Text style={styles.commentText1}> {creationDate}</Text>
                    </NeomorphBox>
                )}
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        item.content === "" ? (
            <Item
                authorName={item.authorName}
                authorSurname={item.authorSurname}
                noteId={item.noteId}
                creationDate={new Date(item.creationDate).toLocaleDateString()}
                content={item.content}
                rating={item.rating}
            />
            ) : (
            <TouchableOpacity onPress={() => selectComment(item)}>
                <Item
                    authorName={item.authorName}
                    authorSurname={item.authorSurname}
                    noteId={item.noteId}
                    creationDate={new Date(item.creationDate).toLocaleDateString()}
                    content={item.content}
                    rating={item.rating}
                />
            </TouchableOpacity>
        )
    );

    if (dataAvalible) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ alignSelf: 'stretch' }}>
                    <View style={styles.containerInner}>
                        <View style={styles.center}>
                            <HeaderBarComponent navigation={navigation} />
                            <FlatList
                                data={comments}
                                extraData={refresh}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.creationDate}
                                refreshing={false}
                                style={{ marginTop: 85, marginBottom: 55 }}
                                onRefresh={() => getComments()}
                                removeClippedSubviews={true}
                                nestedScrollEnabled
                                ListHeaderComponent={() => (
                                    <Text style={styles.title2}>Komentarze</Text>
                                )}
                                ListEmptyComponent={() => (
                                    <Text style={styles.text1}>Brak komentarzy</Text>
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
