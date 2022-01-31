import React, { useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
// import CreateUser from "../components/CreateUser";
import UserContext from '../Context/UserContext'
import { useNavigation } from '@react-navigation/native';



function logout() {
    console.log("user logged out!")
    localStorage.clear()
}


const ProfileScreen = () => {
    const navigation = useNavigation()
    const { userData } = useContext(UserContext)

    return (
        <View>
            <Text>Profile</Text>
            <Text>{userData}</Text>
            {/* {userData.length && userData.map(user => <div>{user.user_data}</div>)} */}
            {/* <CreateUser /> */}

            <Pressable style={styles.button} title="logout" onPress={() =>
                //  logout,
                navigation.navigate('Description')}>
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