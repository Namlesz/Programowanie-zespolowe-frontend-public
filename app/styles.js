import { StyleSheet, Dimensions, StatusBar } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9eeef',
        alignItems: 'center',
        height: Dimensions.get('window').height + StatusBar.currentHeight
    },
    containerInner: {
        height: '100%'
    },
    title: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 60
    },
    title2: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 26,
        textAlign: 'left',
        marginBottom: 15,
        marginLeft: 25
    },
    title2home: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 25
    },
    title2red: {
        fontFamily: 'arial-bold',
        color: '#ff5f71',
        fontSize: 30,
        textAlign: 'left'
    },
    title2v2: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 26,
        textAlign: 'left',
        marginBottom: 5,
        marginLeft: 25
    },
    title2v3: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 26,
        textAlign: 'left',
        marginBottom: 15,
        marginLeft: 25,
        fontWeight: 'bold'
    },
    title3: {
        fontFamily: 'arial-bold',
        color: '#121212',
        fontSize: 26,
        textAlign: 'left',
        marginBottom: 15
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60
    },
    text0: {
        fontFamily: 'arial-bold',
        fontSize: 24,
        color: '#ffffff',
        width: '100%',
        textAlign: 'center'
    },
    text1: {
        fontFamily: 'arial-bold',
        fontSize: 18,
        color: '#000000',
        width: '100%',
        textAlign: 'center'
    },
    text1v2: {
        fontFamily: 'arial-bold',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 2
    },
    text2: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 2
    },
    text2v2: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        textAlign: 'left',
        marginBottom: 2
    },
    text3: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    text4: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        height: 38,
        width: '87%',
        alignSelf: 'center',
        textAlign: 'left',
        margin: 10
    },
    text4Details: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        height: 38,
        width: '87%',
        alignSelf: 'center',
        textAlign: 'left',
        marginLeft: 10
    },
    text4DetailsDesc: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        height: 38,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'left',
        marginLeft: 20
    },
    text4v2: {
        fontFamily: 'arial-bold',
        fontSize: 18,
        color: '#000000',
        height: 38,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'left'
    },
    text4v3: {
        fontFamily: 'arial-bold',
        fontSize: 20,
        color: '#000000',
        height: 38,
        width: '100%',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginLeft: 10
    },
    text5: {
        fontFamily: 'arial-bold',
        fontSize: 20,
        color: '#ffffff',
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    text5v1: {
        fontFamily: 'arial-bold',
        fontSize: 20,
        color: '#000000',
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    text6: {
        fontFamily: 'arial-bold',
        fontSize: 20,
        color: '#323232',
        width: '100%',
        textAlign: 'left',
        marginLeft: 25
    },
    textInput: {
        top: '-1%',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 12,
        borderWidth: 0
    },
    textInputDesc: {
        width: '100%',
        height: '100%',
        padding: 10,
        textAlignVertical: "top"
    },
    checkBox: {
        height: 38,
        width: '87%',
        alignSelf: 'center',
        borderColor: 'black',
        marginTop: 10,
        marginBottom: 10
    },
    checkBoxText: {
        fontFamily: 'arial-bold',
        fontSize: 14,
        color: '#000000',
        textDecorationLine: 'none'
    },
    checkBoxIcon: {
        borderRadius: 4,
        borderColor: '#62eae8'
    },
    neu: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 60,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuProfilePicture: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 120,
        width: 120,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuRatingBox: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 90,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuRatingBoxComment: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 160,
        width: Dimensions.get('screen').width * 0.89,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuButtonBox: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 380,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuImages1: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 120,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuImages2: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 240,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuImages3: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 360,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuImages4: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 480,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuImages5: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 600,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuButtonBoxSettings: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 160,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuButtonBoxExtended: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 480,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuInner: {
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 60,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuInnerDetails: {
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 120,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuInner_hidden: {
        shadowOpacity: 1,
        shadowRadius: 0,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 60,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuAcceptInner: {
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#63ece9',
        height: 60,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    neuAcceptInner_hidden: {
        shadowOpacity: 1,
        shadowRadius: 0,
        borderRadius: 12,
        backgroundColor: '#63ece9',
        height: 60,
        width: Dimensions.get('screen').width * 0.87,
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonMargin: {
        marginBottom: 25
    },
    buttonMargin2: {
        marginBottom: 100
    },
    buttonMargin2v2: {
        marginBottom: '75%'
    },
    commentMargin: {
        marginBottom: 5,
        display: 'flex'
    },
    buttonMargin3: {
        marginTop: 15,
        marginLeft: 30
    },
    buttonMargin3v2: {
        marginTop: 10,
        marginLeft: 25
    },
    buttonMargin4: {
        marginBottom: 25,
        marginTop: 25
    },
    buttonMargin4v2: {
        marginBottom: 40,
        marginTop: 40
    },
    textInputMargin: {
        marginBottom: 15
    },
    textInputMargin2: {
        marginBottom: 140
    },
    textMargin: {
        marginTop: 15
    },
    profilePictureMargin: {
        marginTop: 10,
        marginBottom: 25
    },
    register: {
        height: '10%'
    },
    register2: {
        height: '20%'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },

    scrollArea: {
        top: 45,
        left: 0,
        width: 350,
        height: 569,
        position: 'absolute',
        backgroundColor: '#e9eeef'
    },
    scrollArea_contentContainerStyle: {
        height: 569,
        width: 350
    },
    image: {
        bottom: 0,
        width: '100%',
        height: 292,
        position: 'absolute',
        left: 0
    },
    fullNote: {
        bottom: 0,
        width: '85%',
        height: 292,
        position: 'absolute',
        left: 0
    },
    scrollAreaStack: {
        width: '100%',
        height: '100%',
        marginTop: 108
    },
    button2: {
        width: '20%',
        height: 53,
        backgroundColor: '#E6E6E6',
        marginLeft: '15%'
    },
    button3: {
        width: '20%',
        height: 53,
        backgroundColor: '#E6E6E6',
        marginLeft: '15%'
    },
    buttonRow: {
        height: 53,
        flexDirection: 'row',
        flex: 1,
        marginRight: '10%',

        marginTop: 122
    },
    buttonRow2: {
        height: 53,
        flexDirection: 'row',
        flex: 1,
        marginRight: '10%',

        marginTop: 0
    },
    icon: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    icon2: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    rating: {
        width: '75%',
        height: '50%'
    },

    navbar: {
        width: '100%',
        height: 110,
        position: 'absolute',
        //bottom: -30,
        bottom: '-2%',
        resizeMode: 'stretch'
    },
    navbarPos: {
        width: '100%',
        height: 110,
        position: 'absolute',
        //bottom: -30,
        bottom: '-2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbar_home_button: {
        width: 36,
        height: 36
    },
    navbar_home_button_bg: {
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 50
    },
    navbar_home_button_bg_hidden: {
        shadowOpacity: 1,
        shadowRadius: 0,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 50
    },
    navbar_search_button: {
        width: 36,
        height: 36
    },
    navbar_search_button_bg: {
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    navbar_search_button_bg_hidden: {
        shadowOpacity: 1,
        shadowRadius: 0,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    navbar_add_button: {
        width: 36,
        height: 36
    },
    navbar_add_button_bg: {
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 50
    },
    navbar_add_button_bg_hidden: {
        shadowOpacity: 1,
        shadowRadius: 0,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 58,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 50
    },
    navbar_bg_inner: {
        shadowOpacity: 0.7,
        shadowRadius: 3,
        borderRadius: 10,
        backgroundColor: '#e9eeef',
        height: 55,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1
    },
    navbar_bg_inner2: {
        shadowOpacity: 0.7,
        shadowRadius: 3,
        borderRadius: 11,
        backgroundColor: '#e9eeef',
        height: 52,
        width: 52,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9
    },
    navbar_bg_inner_hidden: {
        shadowOpacity: 0.7,
        shadowRadius: 0,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 55,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonBar: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
        //borderWidth: 2
    },
    buttonAdd: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    buttonEdit1: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 20
    },
    buttonEdit2: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 80
    },
    buttonEdit3: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20
    },
    buttonReport: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        marginTop: 5
    },

    headerBar: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 25,
        alignItems: 'center',
        justifyContent: 'center'
        /*borderColor: 'red',
        borderWidth: 2*/
    },
    hamburger_button: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 20
    },
    hamburger_button_icon: {
        width: 22,
        height: 22
    },
    notification_button: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 90
    },
    notification_button_icon: {
        width: 22,
        height: 22
    },
    support_button: {
        shadowRadius: 3,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20
    },
    support_button_icon: {
        width: 30,
        height: 30
    },

    drawerNeuProfilePicture: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 70,
        width: 70
    },
    drawerProfilePictureMargin: {
        marginTop: 10,
        marginBottom: 10
    },
    drawerBody: {
        flex: 1,
        backgroundColor: '#e9eeef'
    },
    drawerContent: {
        flexDirection: 'row',
        marginLeft: 10
    },
    drawerUserInfo: {
        flexDirection: 'column',
        marginLeft: 20
    },
    drawerTittle: {
        fontSize: 19,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    drawerCaption: {
        fontSize: 15,
        marginBottom: 15,
        lineHeight: 14
    },

    searchCenter: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    homeCenter: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15
    },
    searchButtonMargin: {
        marginBottom: 25,
        display: 'flex'
    },
    neuNoteBox: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 145,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuNoteBoxHome: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 145,
        width: Dimensions.get('screen').width * 0.74,
        alignSelf: 'flex-start',
        display: 'flex'
    },
    neuNoteBoxHome1: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 145,
        width: Dimensions.get('screen').width * 0.74,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    neuUserBox: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 100,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuNoteBox1: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 200,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        display: 'flex'
    },
    neuNoteBoxButtonRow: {
        height: 45,
        width: Dimensions.get('screen').width * 0.89,
        flexDirection: 'row',
        display: 'flex',
        shadowRadius: 5,
        borderRadius: 12
    },
    neuNoteBoxButton1: {
        backgroundColor: '#b3fffd',
        width: Dimensions.get('screen').width * 0.89,
        height: 45,
        shadowRadius: 5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        justifyContent: 'center'
    },
    neuNoteBoxButton2: {
        backgroundColor: '#3cc9ac',
        width: Dimensions.get('screen').width * 0.59,
        height: 45,
        shadowRadius: 5,
        borderBottomRightRadius: 12,
        justifyContent: 'center'
    },
    neuCardBox: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 80,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },

    neuCommentBox: {
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 100,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuCommentBoxSmall: {
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 50,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuCommentBoxLarge: {
        shadowRadius: 2,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 300,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    searchNoteInfo: {
        display: 'flex',
        flexDirection: 'row'
        //borderWidth: 1
    },
    detailsNoteInfo: {
        display: 'flex',
        flexDirection: 'row',
        //borderWidth: 1,
        height: 240
    },
    searchImageContainer: {
        width: '30%',
        height: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
        //borderWidth: 1,
    },
    searchImageContainerDetails: {
        width: '30%',
        height: 110,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
        //borderWidth: 1,
    },
    neuNoteBoxLarge: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 385,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuNoteBoxLargeExtended: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 445,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    neuNoteBoxComment: {
        shadowRadius: 5,
        borderRadius: 12,
        backgroundColor: '#e9eeef',
        height: 180,
        width: Dimensions.get('screen').width * 0.89,
        alignSelf: 'center',
        display: 'flex'
    },
    searchImageBoxBackground: {
        width: 100,
        height: 100,
        marginTop: 15
    },
    searchInfoContainer: {
        width: '62%',
        height: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        //borderWidth: 1,
        display: 'flex'
    },
    detailsInfoContainer: {
        width: '62%',
        height: 180,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        //borderWidth: 1,
        display: 'flex'
    },
    searchTittleContainer: {
        width: '100%'
    },
    searchTextTittle: {
        fontFamily: 'arial-bold',
        fontSize: 19,
        color: '#000000',
        textAlign: 'left',
        //borderWidth: 1,
        width: '100%'
    },
    ratingSearch: {
        width: '75%',
        height: '50%',
        marginBottom: -7,
        marginTop: -7
    },
    ratingSearch2: {
        width: '75%',
        height: '50%',
        marginBottom: -25,
        marginTop: -25
    },
    ratingSearch3: {
        width: '40%',
        height: 20,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    searchText: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        marginBottom: 2
    },
    searchNotePrice: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    searchText1: {
        fontFamily: 'arial-bold',
        fontSize: 15,
        color: '#000000',
        marginBottom: 2,
        flex: 1
    },
    textSearchPrice: {
        textAlign: 'left',
        fontFamily: 'arial-bold',
        fontSize: 17,
        color: '#000000',
        marginBottom: 2,
        marginLeft: 'auto',
        marginRight: 3
    },
    commentText: {
        fontFamily: 'arial-bold',
        fontSize: 14,
        color: '#000000',
        marginBottom: 2,
        textAlign: 'left',
        flex: 1
    },
    commentText1: {
        fontFamily: 'arial-bold',
        fontSize: 12,
        color: '#000000',
        marginBottom: 2,
        textAlign: 'right',
        marginRight: 10
    },
    commentBox: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    },
    commentAuthor: {
        display: 'flex',
        flexDirection: 'row'
    },
    commentContent: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        shadowRadius: 12,
        borderRadius: 7,
        width: '100%',
        height: 50
    },
    commentContentLarge: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        shadowRadius: 12,
        borderRadius: 7,
        width: '100%',
        height: 250
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    loading:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(91,91,91,0.25)'
    },
});
