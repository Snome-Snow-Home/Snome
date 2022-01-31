import React, { useContext } from 'react'
import { View, Text, Pressable } from 'react-native'
// import CreateUser from "../components/CreateUser";
import UserContext from '../Context/UserContext'
import UserProvider from '../Context/UserProvider';


function logout() {
    console.log("user logged out!")
    localStorage.clear()
}


const ProfileScreen = () => {
    const { userData } = useContext(UserContext)

    return (
        <View>
            <Text>Profile</Text>
            <Text>{userData}</Text>
            {/* {userData.length && userData.map(user => <div>{user.user_data}</div>)} */}
            {/* <CreateUser /> */}

            <Pressable title="logout" onPress={logout}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    )
}

export default ProfileScreen
