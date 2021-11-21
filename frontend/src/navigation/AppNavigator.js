import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import TownsScreen from '../screens/TownsScreen';
import LikesScreen from '../screens/LikesScreen';
import MatchScreen from '../screens/MatchScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';

import styled from 'styled-components';

const TAB_ICON = {
    Towns: 'home',
    Likes: 'favorite-outline',
    Match: 'swap-calls',
    Message: 'messenger-outline',
    Profile: 'account-box',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        tabBarIcon: () => (
            <Button>
            <MaterialIcons name={iconName} />
            </Button>
        )
    }
}

export const AppNavigator = () => {
    return (
    <>
      <Tab.Navigator
        screenOptions={createScreenOptions}
      >
        <Tab.Screen name="Towns" component={TownsScreen}/>
        <Tab.Screen name="Likes" component={LikesScreen}/>
        <Tab.Screen name="Match" component={MatchScreen}/>
        <Tab.Screen name="Message" component={MessageScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
    </>
    )
};

const Button = styled.button`
    padding: 8px 16px;
`;

// size={size} color={color}
// { size, color }

// tabBarOptions={{
//     activeTintColor: colors.brand.primary,
//     inactiveTintColor: colors.brand.muted,
// }}