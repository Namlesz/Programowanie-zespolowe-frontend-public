import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector } from 'react-redux';
import HeaderBarComponent from '../components/headerBarComponent';
import NavbarComponent from '../components/navbarComponent';
import StarComponent from '../components/starComponent'

export default function CommentDetailsScreen({ navigation }) {
    const commentData = useSelector((state) => state.commentData);

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
                    <NeomorphBox style={styles.neuCommentBoxLarge}>
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
                            <View style={styles.commentContentLarge}>
                                <Text style={styles.commentText}> {content}</Text>
                            </View>
                        </View>
                        <Text style={styles.commentText1}> {creationDate}</Text>
                    </NeomorphBox>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ alignSelf: 'stretch' }}>
                <View style={styles.containerInner}>
                    <View style={styles.center}>
                        <HeaderBarComponent navigation={navigation} />
                        <View>
                            <View style={{ marginBottom: '55%' }}>
                                <Item
                                    authorName={commentData.authorName}
                                    authorSurname={commentData.authorSurname}
                                    noteId={commentData.noteId}
                                    creationDate={new Date(
                                        commentData.creationDate
                                    ).toLocaleDateString()}
                                    content={commentData.content}
                                    rating={commentData.rating}
                                />
                            </View>
                        </View>
                    </View>
                    <NavbarComponent navigation={navigation} />
                </View>
            </SafeAreaView>
        </View>
    );
}
