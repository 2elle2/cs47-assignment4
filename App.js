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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import SongScreen from './Screens/SongScreen';
import SoundPreviewScreen from './Screens/SoundPreviewScreen';

const Stack = createStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{headerShown: false}} 
          name="HomeScreen" 
          component={HomeScreen} />
        <Stack.Screen name="SongScreen" component={SongScreen} />
        <Stack.Screen name="SoundPreviewScreen" component={SoundPreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
