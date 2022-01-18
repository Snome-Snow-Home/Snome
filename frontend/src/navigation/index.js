import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack'
import { AppNavigator } from './AppNavigator';
// import { useAuth } from '../contexts/Auth';
// import { Loading } from '../components/Loading';

export default function Router() {
    // const { authData, loading } = useAuth("true");
    const authData = { token: false }


    return (
        <NavigationContainer>
            {authData?.token ? <AppNavigator /> : <AuthStack />}
            {/* <AppNavigator /> */}
        </NavigationContainer>
    );
};