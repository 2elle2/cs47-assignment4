/* 
Name: Michelle Leung 
CS 47 Assignment 3 (Spotify)
*/

import { StyleSheet, SafeAreaView, FlatList, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from './Themes/colors';
import Images from './Themes/images'
import Song from './Song';


// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

const Stack = createStackNavigator();

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

  function SpotifyAuthButton() {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.button} onPress={() => {promptAsync()}}>
            <Image 
              source={Images.spotify}
              style={styles.logo}/>
            <Text style={styles.buttonText}> CONNECT WITH SPOTIFY</Text>
        </Pressable>
      </SafeAreaView>
    )
  }


  const renderSong = ({ song }) => (
    <Song
      idx={song.track.track_number} 
      image={song.images[0]} 
      title={song.name} 
      artist={song.artists.name}
      album={song.album.name}
      duration={song.duration_ms}
    />
  )

  let contentDisplayed = null;

  if (token) {
    // contentDisplayed = <Text style={styles.buttonText}>TODO: Put FlatList here!</Text>
    contentDisplayed = <FlatList
                          data={tracks}
                          renderItem={renderSong} 
                        /> // Our FlatList of songs
  } else {
    contentDisplayed = <SpotifyAuthButton/> // Our "Connect with Spotify" button
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions= {{
    //       // Custom Header Styles
    //       headerStyle: {
    //         backgroundColor: Colors.background
    //       },
    //       headerTitleStyle: {
    //         color: 'white',
    //         fontWeight: 'bold',
    //       },
    //     }}
    //   >
    //     {/* <Stack.Screen
    //       name="SpotifyAuthButton"
    //       component={SpotifyAuthButton}
    //       options={{
    //         headerShown: false,
    //       }}
    //     /> */}

    //   </Stack.Navigator>
    // </NavigationContainer>

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
    flexDirection: 'row'
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
  logo: {
    height: 16,
    width: 16,
  }
});
