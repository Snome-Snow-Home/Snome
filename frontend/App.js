import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
// import { Navigation } from './src/navigation';
import Router from './src/navigation/index';
import UserProvider from './src/Context/UserProvider'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default function App() {

  // sessions handler
  // renders <CreateUser/> if no session is found
  // *remember to uncomment import to use the component*

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            {/* <Navigation /> */}
            <Router />
          </ThemeProvider>
          <StatusBar style="auto" />
        </UserProvider>
      </ApplicationProvider>
    </>
  );
}
