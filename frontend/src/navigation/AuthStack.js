import { TabActions } from '@react-navigation/native'
import React, { useState } from 'react';
/////import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import CreateUser from '../components/CreateUser';
import Login from '../screens/Login';



// const TAB_ICON = {
//     Login: 'account-box',
//     CreateUser: 'account-box'
// };

//const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// const createScreenOptions = ({ route }) => {
//     const iconName = TAB_ICON[route.name];

//     return {
//         tabBarIcon: () => (
//             <MaterialIcons style={styles.icon} name={iconName} />
//         )
//     }
// }

export default function AuthStack() {
    return (
        <>
            <Stack.Navigator
            //screenOptions={{ headerShown: false }}
            // name="authstack"
            >

                <Stack.Screen name="Login" component={Login} />
                {/* </Stack.Group> */}
                {/* <Stack.Group screenOptions={{ headerShown: false }}> */}
                <Stack.Screen name="CreateUser"
                    component={CreateUser}
                // options={{
                //     headerShown: false,
                //     title: 'Sign Up'
                // }}
                />

            </Stack.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'gray',
        padding: 10
    }
})


