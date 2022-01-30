import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import Colors from './Themes/colors';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Song({ idx, image, title, artist, album, duration }) {
    return (
        <View style={styles.song}>
            <Text style={styles.idx}>{idx}</Text>
            <Image style={styles.song_image} source={require("./assets/spotify-logo.png")}/>
            <View style={styles.song_title_and_artist}>
                <Text numberOfLines={1} style={styles.song_title}>{title}</Text>
                <Text numberOfLines={1} style={styles.song_artist}>{artist}</Text>
            </View>
            <Text numberOfLines={1} style={styles.album}>{album}</Text>
            <Text style={styles.duration}>{millisToMinutesAndSeconds(duration)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    song: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'row',
        marginVertical: 4,
        padding: 2,
        // justifyContent: 'space-between',
    },
    idx: {
        fontSize: 16,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', // horizontally center text
        flex: 1.5,
        backgroundColor: 'blue' //testing purposes
    },
    song_image: {
        // height: windowHeight * 0.01,
        // width: windowWidth * 0.05,
        aspectRatio: 1,
        flex: 3.5,
    },
    song_title_and_artist: {
        flex: 7,
        backgroundColor: 'blue' //testing purposes
    },
    song_title: {
        fontSize: 16,
        color: Colors.gray,
        flex: 1,
        backgroundColor: 'purple' //testing purposes
    },
    song_artist: {
        fontSize: 14,
        color: Colors.lightgray,
        flex: 1,
        backgroundColor: 'lightblue' //testing purposes
    },
    album: {
        fontSize: 16,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6,
        backgroundColor: 'orange' //testing purposes
    },
    duration: {
        fontSize: 16,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        backgroundColor: 'blue' //testing purposes
    },

})