import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import Colors from './Themes/colors';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';

export default function Song({ idx, image, title, artist, album, duration }) {
    return (
        <View style={styles.song}>
            <Text style={styles.text}>{idx}</Text>
            <Image style={styles.song_image} source={require("./assets/spotify-logo.png")}/>
            <View style={styles.song_title_and_artist}>
                <Text numberOfLines={1} style={styles.song_title}>{title}</Text>
                <Text numberOfLines={1} style={styles.song_artist}>{artist}</Text>
            </View>
            <Text numberOfLines={1} style={styles.text}>{album}</Text>
            <Text style={styles.text}>{millisToMinutesAndSeconds(duration)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    song: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    song_image: {
        height: "100%",
        
    },
    song_title_and_artist: {
        flex: 1,
    },
    song_title: {
        fontSize: 16,
        color: Colors.gray,
    },
    song_title: {
        fontSize: 14,
        color: Colors.lightgray,
    },

})