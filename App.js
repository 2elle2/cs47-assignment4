/* 
Name: Michelle Leung 
CS 47 Assignment 3 (Spotify)
*/

import Colors from './Themes/colors';

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
        <Stack.Screen 
          name="SongScreen" 
          component={SongScreen}
          options={{
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: Colors.background
            },
            headerTitleStyle: {
              color: 'white',
            },
            title: 'Song details',
          }} />
        <Stack.Screen 
          name="SoundPreviewScreen" 
          component={SoundPreviewScreen}
          options={{
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: Colors.background
            },
            headerTitleStyle: {
              color: 'white',
            },
            title: 'Song preview',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
