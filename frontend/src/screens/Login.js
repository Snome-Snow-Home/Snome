import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../Context/UserContext'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UseTogglePasswordVisibility from '../components/useTogglePassowrdVisibility';


export default function Login() {
    const { passwordVis, rightIcon, handlePasswordVisibility } =
        UseTogglePasswordVisibility();
    const navigation = useNavigation()
    const context = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const B = (props) => <Text style={{ fontWeight: 'bold', color: "#448EB1" }}>{props.children}</Text>

    const login = async (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://10.0.0.53:3000/login',
            data: {
                username: username,
                password: password
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.data);
                //set token in local storage- on mobile
                AsyncStorage.setItem('token', JSON.stringify(res.data.token))
                //login user
                context.setUserData({
                    ...context.user_data,
                    user_id: res.data.auth_user.id,
                    is_logged_in: true,
                    username: username
                })
                return res
            })
            .then(async (res) => {
                let user_id = res.data.auth_user.id
                console.log('user id: ', user_id)
                console.log('user id type: ', typeof user_id)
                let user_messages = await fetch(`http://10.0.0.53:3000/messages/${user_id}`)
                let messages_json = await user_messages.json()
                context.setMessages(messages_json)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={{ width: "95%", maxWidth: 400, margin: 10 }} >

            <Image source={require('../../assets/Snome.png')}
                style={{ width: 100, height: 100 }} />

            <Text style={{ fontSize: 20, textAlign: "center", margin: 10 }}>
                Login
            </Text >
            <ScrollView>

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="username">Username: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <View style={styles.formInput}>
                    <TextInput
                        id="username"
                        //placeholder="username"
                        type="text"
                        required
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={username}
                        onChangeText={setUsername}
                        style={styles.inputField}
                    />
                </View>

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="password">Password: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <View style={styles.formInput}>
                    <TextInput
                        id="password"
                        // placeholder="password"
                        type="text"
                        required
                        secureTextEntry={passwordVis}
                        //secureTextEntry={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.inputField}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                </View>

                <Pressable style={styles.button} title="Submit"
                    // onPress={handleSubmit}
                    onPress={(e) => { login(e), console.log(`${username} is now logged in`) }}

                >

                    <Text>Lets get Snomey</Text></Pressable>

                <Text style={styles.link}
                    onPress={() => { navigation.navigate('CreateUser') }}
                >New to Snome?  <B>Sign Up Here</B>
                </Text>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    link: {
        margin: 5,
        marginTop: 40,
        textAlign: "center",
        color: "#464545",
        fontFamily: 'Arial',
    },
    formInput: {
        color: "black",
        backgroundColor: "lightblue",
        borderColor: "lightgray",
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        width: "100%",

    },
    inputField: {
        padding: 5,
        fontSize: 13,
        width: '90%'
    },
    label: {
        margin: 5,
        color: "#464545",
        fontFamily: 'Arial',
    },
    required: {
        margin: 5,
        color: "gray",
        fontFamily: 'Arial',
        fontSize: 14,
    },
    horizontal: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
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
