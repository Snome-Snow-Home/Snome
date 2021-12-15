import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import { Navigation } from './src/navigation';
import UserProvider from './src/Context/UserProvider'

export default function App() {

  // sessions handler
  // renders <CreateUser/> if no session is found
  // *remember to uncomment import to use the component*

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
        <StatusBar style="auto" />
      </UserProvider>
    </>
  );
}
