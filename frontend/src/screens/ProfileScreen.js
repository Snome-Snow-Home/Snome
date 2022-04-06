import React, { useContext } from 'react'
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native'
// import CreateUser from "../components/CreateUser";
import UserContext from '../Context/UserContext'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Title } from 'react-native-paper';
import AddSnomeListing from '../components/AddSnomeListing';


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
            <View style={{
                padding: 8,
                width: '95%',
                backgroundColor: '',
                alignSelf: 'center',
                position: 'relative',
                zIndex: 99,
            }}>
                <Text style={styles.title}>Profile Settings</Text>
                <Avatar.Image style={{ margin: 10 }} size={40} source={require('../pics/avatar.png')} />
                <Text>{context.user_data.username}</Text>
                {/* // <Text>{userData}</Text> */}
                {/* {userData.length && userData.map(user => <div>{user.user_data}</div>)} */}
                {/* <CreateUser /> */}

                <Button mode="contained" style={styles.button} title="logout" onPress={logout}
                >
                    <Text>Logout</Text>
                </Button >
                <AddSnomeListing />
            </View>
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
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34393B',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textShadowColor: 'blue',
    },
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