import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LikesScreen from '../screens/LikesScreen';
import MatchScreen from '../screens/MatchScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListingScreen from '../screens/ListingScreen';
import DescScreen from '../screens/SnomeDescription';

const TAB_ICON = {
  Home: 'home',
  Towns: 'home',
  Likes: 'favorite-outline',
  Match: 'swap-calls',
  Message: 'messenger-outline',
  Profile: 'account-box',
  Login: 'account-box',
  CreateUser: 'account-box'
};

const Tab = createBottomTabNavigator();


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: () => (
      <MaterialIcons style={styles.icon} name={iconName} />
    )
  }
}

export const AppNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={createScreenOptions} >
        <Tab.Group screenOptions={createScreenOptions}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Listing" component={ListingScreen} />
          <Tab.Screen name="Likes" component={LikesScreen} />
          <Tab.Screen name="Match" component={MatchScreen} />
          <Tab.Screen name="Message" component={MessageScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Description" component={DescScreen} />
        </Tab.Group>
      </Tab.Navigator>
    </>
  )
};



const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'gray',
    padding: 10
  }
})
