import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateUser from './components/CreateUser';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CreateUser/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
