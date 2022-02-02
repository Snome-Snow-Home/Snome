import React, { useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
// import CreateUser from "../components/CreateUser";
import UserContext from '../Context/UserContext'
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const navigation = useNavigation()
    const context = useContext(UserContext)

    console.log(context)


    const logout = () => {
        console.log("user logged out!")
        localStorage.clear()
        context.setUserData({
            ...context.userData,
            is_logged_in: false,
            credentials: ""
        })
    }


    return (
        <View>
            <Text>Profile</Text>
            <Text> Your username is: {context.user_data.credentials}</Text>
            {/* // <Text>{userData}</Text> */}
            {/* {userData.length && userData.map(user => <div>{user.user_data}</div>)} */}
            {/* <CreateUser /> */}

            <Pressable style={styles.button} title="logout" onPress={logout}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    )
}



const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#448EB1",
        color: "white",
        fontFamily: 'Arial',
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: 20
    }
})

export default ProfileScreen