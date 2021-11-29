import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/TownsScreen';
// import CreateUser from './src/components/CreateUser';
import { ThemeProvider } from 'styled-components/native';

import { theme } from './src/theme';

import { Navigation } from './src/navigation';

export default function App() {
  
  // sessions handler
  // renders <CreateUser/> if no session is found
  // *remember to uncomment import to use the component*

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
