import { TabActions } from '@react-navigation/native'
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// import { createStackNavigator } from '@react-navigation/stack';

import CreateUser from '../components/CreateUser';
import Login from '../screens/Login';



// const TAB_ICON = {
//     Login: 'account-box',
//     CreateUser: 'account-box'
// };

const Tab = createBottomTabNavigator();
//const Stack = createStackNavigator();


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
            <Tab.Navigator screenOptions={{ headerShown: false }}
            // name="authstack"
            >

                <Tab.Screen name="Login" component={Login} />
                {/* </Tab.Group> */}
                {/* <Tab.Group screenOptions={{ headerShown: false }}> */}
                <Tab.Screen name="CreateUser"
                    component={CreateUser}
                    options={{
                        headerShown: false,
                        title: 'Sign Up'
                    }} />

            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'gray',
        padding: 10
    }
})


