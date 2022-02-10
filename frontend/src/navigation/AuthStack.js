import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateUser from '../components/CreateUser';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();


export default function AuthStack() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="CreateUser"
                    component={CreateUser} />

            </Stack.Navigator>
        </>
    )
}




