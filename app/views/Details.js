import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    TextInput, Alert, FlatList, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from 'react-native-remote-svg';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';
import { setCommentData } from '../utils/commentSlice';
import HeaderBarComponent from '../components/headerBarComponent';
import { showMessage } from 'react-native-flash-message';
import NavbarComponent from '../components/navbarComponent';
import LoadingComponent from "../components/loadingComponent";
import ActivityComponent from '../components/activityComponent';
import StarComponent from "../components/starComponent";

const note_background = require('../assets/note_background.png');

let note;
function setNote(data) {
    note = data;
}

let authorId;
function setAuthorId(id) {
    authorId = id;
}

export { authorId, setAuthorId };

let user3;
function setUser3(data) {
    user3 = data;
}

let comments;
function setComments(data) {
    comments = data;
}

export { comments, setComments };

export { user3, setUser3 };

let filename;
function setFilename(file) {
    filename = file;
}

let files = [];
function setFiles(data){
    files = data;
}

let images = [];

let preview = [];

let components = ['details', 'description', 'author', 'button', 'commentTitle', 'comment1', 'comment2', 'comment3', 'moreComments', 'spacer'];


export default function DetailsScreen({ navigation }) {
    const noteId = useSelector((state) => state.noteId.value);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [editable, setEditable] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [dataAvailable, setDataAvailable] = useState(false);
    const [desc, setDesc] = useState('');
    const [oldDesc, setOldDesc] = useState('');
    const [isBought, setIsBought] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            setIsOwner(false);
            setDataAvailable(false);
            setModalVisible(false);
            setPreviewModalVisible(false);
            setEditable(false);
            setIsBought(false);
            images = [];
            preview = [];
            getDetails();
        });
    }, [navigation]);

    //TODO cleanup function to fix useEffect warning
    React.useEffect(() => {
        setDataAvailable(true);
        return () =>
        {
            setDataAvailable(false);
            setPreviewModalVisible(false);
            setModalVisible(false);

        }
    }, [])

    function getDetails() {
        fetch('https://notedealer-api.herokuapp.com/note/'+noteId.payload)
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            setNote(data);
                            if (data.data.authorId === userData._id) {
                                setIsOwner(true);
                            }
                            setDesc(data.data.description);
                            setOldDesc(data.data.description);
                            setFiles(note.files);
                        })
                        .then(() => checkBought());
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

    function checkBought() {
        fetch('https://notedealer-api.herokuapp.com/isBought', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                noteId: note.data._id
            })
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    setIsBought(true);
                } else if (response.status === 420) {
                    setIsBought(false);
                }
            })
            .then(() => getUserInfo())
            .catch((error) => {
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });
    }

    function getUserInfo() {
        fetch('https://notedealer-api.herokuapp.com/userInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: note.data.authorId
            })
        })
            .then((response) => {
                console.log(response.status);

                if (response.status === 201) {
                    response
                        .json()
                        .then((data) => {
                            setUser3(data);

                            if (filename) {
                                FileSystem.deleteAsync(filename);
                            }

                            if (user3.avatar) {
                                let file =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(file, user3.avatar.image, {
                                    encoding: FileSystem.EncodingType.Base64
                                });
                                setFilename(file);
                            }
                        })
                        .then(() => getComments());
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

    function notePreview() {
        setIsLoading(true);
        fetch('https://notedealer-api.herokuapp.com/files/'+note.data.miniature)
            .then((response) => {
                console.log(response.status);

                if (response.status === 200) {
                    response
                        .json()
                        .then((data) => {

                            if(data.content.data){
                                let file =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(file, data.content.data, {
                                    encoding: FileSystem.EncodingType.Base64
                                });
                                preview[0] = {uri: file};
                            }

                        })
                        .then(() => {
                            setIsLoading(false);
                            setPreviewModalVisible(true);
                        });
                } else setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });


    }

    async function downloadFiles() {
        for (let file in files) {

            console.log(files[file]._id);
            await fetch('https://notedealer-api.herokuapp.com/files/' + files[file]._id)
                .then((response) => {
                    console.log(response.status);

                    if (response.status === 200) {
                        response
                            .json()
                            .then((data) => {

                                if (data.content.data) {
                                    let fileUri =
                                        FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                    FileSystem.writeAsStringAsync(fileUri, data.content.data, {
                                        encoding: FileSystem.EncodingType.Base64
                                    });
                                    images[file] = { uri: fileUri }
                                }
                            })
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
        //setModalVisible(true)
    }

    function downloadOneFile(file){
        fetch('https://notedealer-api.herokuapp.com/files/'+file)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response
                        .json()
                        .then((data) => {
                            if(data.content.data){
                                let fileUri =
                                    FileSystem.cacheDirectory + new Date().toISOString() + '.jpg';
                                FileSystem.writeAsStringAsync(fileUri, data.content.data, {
                                    encoding: FileSystem.EncodingType.Base64
                                });
                                images[0] = {uri: fileUri};
                            }

                        })
                        .then(() => {
                            setIsLoading(false);
                            setModalVisible(true);
                        });
                } else setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
                showMessage({
                    message: 'Błąd połączenia z serwerem',
                    type: 'danger'
                });
            });

    }

    async function downloadNote() {
        setIsLoading(true);
        if(files.length >=2){
            await downloadFiles().then(() => {
                setIsLoading(false);
                setModalVisible(true);
            });
        }
        else if(files.length === 1){
            downloadOneFile(files[0]._id);
        }
        //await downloadFiles();
    }

    function deleteNote(){

        Alert.alert('Uwaga', 'Czy chcesz usunąć notatkę? (Tej operacji nie da się odwrócić)', [
            {
                text: 'Anuluj',
                onPress: () => null,
                style: 'cancel'
            },
            { text: 'TAK', onPress: () => deleteNoteTrue()}
        ])
    }

    function deleteNoteTrue(){
        console.log(note.data._id);

        fetch('https://notedealer-api.herokuapp.com/note/'+note.data._id, { method: 'DELETE' })
            .then((response) => {
                console.log(response.status);

                if (response.status === 202) {
                    showMessage({
                        message: 'Usunięto notatkę',
                        type: 'warning'
                    });
                    navigation.goBack();
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

    function sendChange(desc) {
        fetch('https://notedealer-api.herokuapp.com/updateNoteDescription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: noteId.payload,
                description: desc
            })
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    setOldDesc(desc);
                    setEditable(false);
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

    const HeaderItem = () => (
        <>
        <Text style={styles.title2}>Szczegóły notatki</Text>

    <NeomorphBox style={styles.buttonReport}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                isOwner ?
                    deleteNote()
                    :
                    navigation.navigate('NoteReportForm')
            }}
        >
            {
                isOwner ?
                    <FontAwesome5
                        name="trash"
                        size={24}
                        color="black"
                    />
                    :
                    <FontAwesome5
                        name="exclamation-circle"
                        size={24}
                        color="black"
                    />
            }
        </TouchableOpacity>
    </NeomorphBox>
        </>
    );

    const DetailsItem = () => (
        <>
            <NeomorphBox
                style={
                    {
                        shadowRadius: 5,
                        borderRadius: 12,
                        backgroundColor: '#e9eeef',
                        height: 215,
                        width: Dimensions.get('screen').width * 0.89,
                        alignSelf: 'center',
                        display: 'flex'
                    }
                }
            >
                <View style={styles.detailsNoteInfo}>

                                        <View style={styles.searchImageContainerDetails}>
                                            <TouchableOpacity onPress={() => notePreview()} disabled={isLoading}>

                                                <Image
                                                    source={note_background}
                                                    style={styles.searchImageBoxBackground}
                                                />
                                                <Text style={{marginTop:10}}>
                                                    Liczba stron: {note.data.numberOfPages}
                                                </Text>

                                                <Image source={require('../assets/preview_button.png')}
                                                       style={{width: 50,
                                                           height: 50,
                                                           marginTop: -95,
                                                       alignSelf: 'center'}}
                                                />


                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsInfoContainer}>
                        <View style={styles.searchTittleContainer}>
                            <Text style={styles.searchTextTittle}>
                                {note.data.title}
                            </Text>
                        </View>
                        <StarComponent rating={note.data.rating} style={styles.ratingSearch2}/>
                        <Text >
                            Rok studiów: {note.data.year}
                        </Text>
                        <Text >
                            Uczelnia: {note.data.school}
                        </Text>
                        <Text >
                            Kierunek: {note.data.major}
                        </Text>
                        <Text >
                            Przedmiot: {note.data.subject}
                        </Text>
                        <Text >
                            Data utworzenia:{' '}
                            {new Date(
                                note.data.creationDate
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.textSearchPrice}>
                            {note.data.price}zł
                        </Text>
                    </View>
                </View>
            </NeomorphBox>
        </>
    );

    const DescriptionItem = () => (
        <View style={{ marginTop: 30 }}>
            <Text style={styles.text4Details}>Opis</Text>

            <NeomorphBox
                inner
                lightShadowColor="#ffffff"
                darkShadowColor="#bec8d2"
                style={styles.neuInnerDetails}
            >
                <TextInput
                    editable={editable}
                    defaultValue={desc}
                    style={styles.textInputDesc}
                    multiline={true}
                    onEndEditing={(value) => setDesc(value.nativeEvent.text)}
                        />
            </NeomorphBox>
            {isOwner ? (
                <View>
                    {!editable ? (
                        <View style={styles.buttonBar}>
                            <NeomorphBox style={styles.buttonEdit1}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setEditable(true)}
                                >
                                    <FontAwesome5
                                        name="edit"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </NeomorphBox>
                        </View>
                    ) : (
                        <View style={styles.buttonBar}>
                            <NeomorphBox style={styles.buttonEdit2}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => sendChange(desc)}
                                >
                                    <FontAwesome5
                                        name="check"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </NeomorphBox>
                            <NeomorphBox style={styles.buttonEdit3}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setDesc(oldDesc);
                                        setEditable(false)
                                    }}
                                >
                                    <FontAwesome5
                                        name="times"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </NeomorphBox>
                        </View>
                    )}
                </View>
            ) : (
                <View />
            )}
        </View>


    )

    const AuthorItem = () => (
        <View style={{ marginTop: 30, marginBottom: 15 }}>
            <Text style={styles.text4Details}>Autor</Text>
            <NeomorphBox style={styles.neuUserBox}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfilePublic')}
                    activeOpacity={0.75}
                >
                    <View style={styles.drawerContent}>
                        <View style={styles.drawerProfilePictureMargin}>
                            <NeomorphBox
                                style={styles.drawerNeuProfilePicture}
                            >
                                {
                                    user3.avatar ?
                                        <Image
                                            source={{uri: filename}}
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
                                {user3.name} {user3.surname}
                            </Text>
                            {user3.nickname ? (
                                <Text style={styles.drawerCaption}>
                                    {user3.nickname}
                                </Text>
                            ) : null}
                            <Text style={styles.drawerCaption}>
                                {user3.email}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </NeomorphBox>
        </View>
    );

    const ButtonItem = () => (
        <View style={styles.buttonMargin4v2}>

                <NeomorphBox
                    inner
                    lightShadowColor="#b3fffd"
                    darkShadowColor="#13d8d5"
                    style={styles.neuAcceptInner_hidden}
                >
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.75}
                        onPress={() => {
                            if (!isBought && !isOwner) {
                                navigation.navigate('Payment');
                            } else {
                                downloadNote();
                            }
                        }}
                    >
                        <Text style={styles.text0}>
                            {!isBought && !isOwner
                                ? 'Kup notatkę'
                                : isOwner
                                    ? 'Podgląd notatki'
                                    : 'Pobierz notatkę'}
                        </Text>
                    </TouchableOpacity>
                </NeomorphBox>

        </View>
    );


    const CommentItem = ({ authorName, authorSurname, creationDate, content, rating }) => (
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

    const renderItem = ({ item }) => {
        if(item === 'details'){
            return(<DetailsItem/>)
        } else if(item === 'description'){
            return (<DescriptionItem/>)
        } else if(item === 'author'){
            return(<AuthorItem/>)
        } else if(item === 'button'){
            return(<ButtonItem/>)
        } else if(item === 'commentTitle' && comments[0]){
            return(
                <View style={{marginTop: 10}}>
                    <Text style={styles.title2}>Komentarze</Text>
                </View>
            )

        } else if(item === 'comment1' && comments[0]){
            return (
                comments[0].content === "" ? (
                    <CommentItem
                        authorName={comments[0].authorName}
                        authorSurname={comments[0].authorSurname}
                        noteId={comments[0].noteId}
                        creationDate={new Date(
                            comments[0].creationDate
                        ).toLocaleDateString()}
                        content={comments[0].content}
                        rating={comments[0].rating}
                    />
                ) : (
                    <TouchableOpacity
                        onPress={() => selectComment(comments[0])}
                    >
                        <CommentItem
                            authorName={comments[0].authorName}
                            authorSurname={comments[0].authorSurname}
                            noteId={comments[0].noteId}
                            creationDate={new Date(
                                comments[0].creationDate
                            ).toLocaleDateString()}
                            content={comments[0].content}
                            rating={comments[0].rating}
                        />
                    </TouchableOpacity>
                )
            )

        } else if(item === 'comment2' && comments[1]){
        return(
            comments[1].content === "" ? (
                <CommentItem
                    authorName={comments[1].authorName}
                    authorSurname={comments[1].authorSurname}
                    noteId={comments[1].noteId}
                    creationDate={new Date(
                        comments[1].creationDate
                    ).toLocaleDateString()}
                    content={comments[1].content}
                    rating={comments[1].rating}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => selectComment(comments[1])}
                >
                    <CommentItem
                        authorName={comments[1].authorName}
                        authorSurname={comments[1].authorSurname}
                        noteId={comments[1].noteId}
                        creationDate={new Date(
                            comments[1].creationDate
                        ).toLocaleDateString()}
                        content={comments[1].content}
                        rating={comments[1].rating}
                    />
                </TouchableOpacity>
            )
        )

        } else if(item === 'comment3' && comments[2]){
        return (
            comments[2].content === "" ? (
                <CommentItem
                    authorName={comments[2].authorName}
                    authorSurname={comments[2].authorSurname}
                    noteId={comments[2].noteId}
                    creationDate={new Date(
                        comments[2].creationDate
                    ).toLocaleDateString()}
                    content={comments[2].content}
                    rating={comments[2].rating}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => selectComment(comments[2])}
                >
                    <CommentItem
                        authorName={comments[2].authorName}
                        authorSurname={comments[2].authorSurname}
                        noteId={comments[2].noteId}
                        creationDate={new Date(
                            comments[2].creationDate
                        ).toLocaleDateString()}
                        content={comments[2].content}
                        rating={comments[2].rating}
                    />
                </TouchableOpacity>
            )
        )

        } else if(item === 'moreComments' && comments[3]){
            return (
                <View style={{ marginTop: 10}}>
                    <NeomorphBox style={styles.neu}>
                        <NeomorphBox
                            inner
                            lightShadowColor="#ffffff"
                            darkShadowColor="#bec8d2"
                            style={styles.neuInner_hidden}
                        >
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.button}
                                onPress={() =>
                                    navigation.navigate('Comments')
                                }
                            >
                                <Text style={styles.text1}>
                                    Pokaż więcej
                                </Text>
                            </TouchableOpacity>
                        </NeomorphBox>
                    </NeomorphBox>
                </View>
            )
        } else if (item === 'spacer'){
            return(<View style={{marginBottom: 100}}/>)
        }
    };


    if (dataAvailable) {
        setAuthorId(note.data.authorId);

        if (modalVisible) {
            return (
                <ImageView
                    images={images}
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                />
            );
        } else if (previewModalVisible) {
            return (
                <ImageView
                    images={preview}
                    imageIndex={0}
                    visible={previewModalVisible}
                    onRequestClose={() => setPreviewModalVisible(false)}
                />
            );
        } else if (!modalVisible && !previewModalVisible) {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ alignSelf: 'stretch' }}>
                        <View style={styles.containerInner}>
                            <View style={styles.center}>
                                <HeaderBarComponent navigation={navigation} />
                            </View>
                            <FlatList
                                horizontal={false}
                                style={{ marginTop: 100, display: 'flex', width: '100%' }}
                                data={components}
                                renderItem={renderItem}
                                ListHeaderComponent={() => (<HeaderItem />)}
                                keyExtractor={(item) => item}
                                removeClippedSubviews={true}
                            >
                            </FlatList>
                            <NavbarComponent navigation={navigation} />
                            {isLoading ? <ActivityComponent /> : null}
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
        } else if (!dataAvailable) {
        return (<LoadingComponent />);
    }
}
