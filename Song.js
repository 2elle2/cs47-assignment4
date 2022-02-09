import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './Themes/colors';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';

const windowWidth = Dimensions.get('window').width;

export default function Song({ idx, imageUrl, title, artists, album, duration, externalUrl, previewUrl }) {
    const navigation = useNavigation();

    return (
        <Pressable 
            onPress={() => navigation.navigate("SongScreen", {url: externalUrl}) }>
            <View style={styles.song}>
                <Pressable 
                    style={styles.play_button} 
                    onPress={(e) => {
                        e.stopPropagation();
                        navigation.navigate("SoundPreviewScreen", {url: previewUrl})
                    }} 
                >
                    <AntDesign name="play" size={windowWidth * 0.045} color={Colors.spotify}/>
                </Pressable>
                <Image style={styles.song_image} source={{uri: imageUrl}}/>
                <View style={styles.song_title_and_artist}>
                    <View style={{justifyContent: 'flex-end'}}>
                        <Text numberOfLines={1} style={styles.song_title}>{title}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.song_artist}>
                        {
                            artists.map((obj,idx) => {
                                return (idx !== artists.length - 1) ? 
                                    <Text key={idx}>{obj.name}, </Text> : 
                                    <Text key={idx}>{obj.name}</Text>
                            })
                        }
                        </Text>
                        {/* <Text numberOfLines={1} style={styles.song_artist}>{artists}</Text> */}
                    </View>
                </View>
                <Text numberOfLines={1} style={styles.album}>{album}</Text>
                <Text style={styles.duration}>{millisToMinutesAndSeconds(duration)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    song: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: 'row',
        marginVertical: 4,
        padding: 2,
        alignItems: 'center',
    },
    play_button: {
        flex: 2,
        alignItems: 'center',
    },
    song_image: {
        width: windowWidth * 0.05,
        aspectRatio: 1,
        flex: 3.5,
    },
    song_title_and_artist: {
        flex: 7,
        padding: windowWidth * 0.02,
        justifyContent: 'center',
    },
    song_title: {
        fontSize: 16,
        color: 'white',
        flex: 1,
    },
    song_artist: {
        fontSize: 14,
        color: Colors.gray,
        flex: 1,
    },
    album: {
        fontSize: 16,
        color: Colors.gray,
        flex: 6,
    },
    duration: {
        fontSize: 16,
        color: Colors.gray,
        flex: 3,
    },

})