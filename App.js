/* 
Name: Michelle Leung 
CS 47 Assignment 3 (Spotify)
*/

import { StyleSheet, SafeAreaView, View, FlatList, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";

import Colors from './Themes/colors';
import Images from './Themes/images'
import Song from './Song';


// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // Authenticated, make API request

      // Select which option you want: Top Tracks or Album Tracks
      // (Comment out the one you are not using:)
      // myTopTracks(setTracks, token);
      albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);




  const renderSong = ({ item, index }) => {
    // console.log(item);
    console.log(item.album.images[0].url);
    // console.log(item.album.images);
    return (
      <Song
        idx={index} 
        image={item.album.images[0].url} 
        title={item.name} 
        artist={item.artists[0].name} // how to set artists if more than 1?
        album={item.album.name}
        duration={item.duration_ms}
      />
    );
  }

  function SongList() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Image 
            source={Images.spotify} 
            style={styles.logoTracks} />
          <Text style={styles.tracksText}> Album Tracks</Text>
        </View>
        <View style={styles.listArea}>
          <FlatList
            data={tracks}
            renderItem={renderSong} 
          />
        </View>
      </SafeAreaView>
    )
  }


  function SpotifyAuthButton() {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.button} onPress={() => {promptAsync()}}>
            <Image 
              source={Images.spotify}
              style={styles.logoConnect}/>
            <Text style={styles.buttonText}> CONNECT WITH SPOTIFY</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  let contentDisplayed = null;

  if (token) {
    contentDisplayed = <SongList/> // Our FlatList of songs
  } else {
    contentDisplayed = <SpotifyAuthButton/> // Our "Connect with Spotify" button
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },

  topBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  listArea: {
    flex: 18,
    flexDirection: 'row',
  },
  logoTracks: {
    height: 20,
    width: 20,
  },
  tracksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  button: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.spotify,
    borderRadius: 99999,
    padding: '3.5%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  logoConnect: {
    height: 16,
    width: 16,
  },
});
