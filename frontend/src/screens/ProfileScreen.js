import React, { useContext } from 'react'
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native'
// import CreateUser from "../components/CreateUser";
import UserContext from '../Context/UserContext'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Title } from 'react-native-paper';


const ProfileScreen = () => {
    const navigation = useNavigation()
    const context = useContext(UserContext)

    console.log(context)


    const logout = () => {
        console.log("user logged out!")
        // localStorage.clear()
        AsyncStorage.removeItem('token', (err) => console.log(err))
        context.setUserData({
            ...context.userData,
            is_logged_in: false,
            username: ""
        })
    }


    return (
        <ScrollView>
            <Title style={styles.header}>Profile Settings</Title>
            <Avatar.Image style={{ margin: 10 }} size={40} source={require('../pics/avatar.png')} />
            <Text> {context.user_data.username}</Text>
            {/* // <Text>{userData}</Text> */}
            {/* {userData.length && userData.map(user => <div>{user.user_data}</div>)} */}
            {/* <CreateUser /> */}
            {'\n'}
            {'\n'}
            {'\n'}
            <Button mode="contained" style={styles.button} title="logout" onPress={logout}>
                <Text>Logout</Text>
            </Button >
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    // button: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingVertical: 12,
    //     paddingHorizontal: 32,
    //     borderRadius: 4,
    //     elevation: 3,
    //     backgroundColor: "#448EB1",
    //     color: "white",
    //     fontFamily: 'Arial',
    //     width: "50%",
    //     marginLeft: "25%",
    //     marginRight: "25%",
    //     marginTop: 20
    // },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50
    },
    button: {
        width: '25%',
        margin: 10
    }
})

export default ProfileScreen