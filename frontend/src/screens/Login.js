import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../Context/UserContext'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {

    const navigation = useNavigation()
    const context = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const B = (props) => <Text style={{ fontWeight: 'bold', color: "#448EB1" }}>{props.children}</Text>

    const protectedHasTokenTest = async (e) => {

      const token = await AsyncStorage.getItem('token')
      console.log(`Bearer ${token.slice(1, token.length-1)}`)

      e.preventDefault()
      axios({
        method: 'get',
        url: 'http://localhost:3000/protected_has_token',
        headers: {
          'Authorization': `Bearer ${token.slice(1, token.length-1)}`
        }
      })
      .then(res => {
          console.log(res)
        })
      .catch( err => {
        console.log('protected error: ', err)
      })
    }

    const unprotected = async (e) => {

      e.preventDefault()
      axios({
        method: 'get',
        url: 'http://localhost:3000/unprotected',
      })
      .then(res => {
          console.log(res)
        })
      .catch( err => {
        console.log('protected error: ', err)
      })
    }


    const login = async (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3000/login',
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
                    is_logged_in: true,
                    username: username
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={{ width: "95%", maxWidth: 400, margin: 10 }} >

<Pressable style={styles.button} title="Submit" onPress={(e)=>{ protectedHasTokenTest(e)}}>
            <Text>protected has token</Text>
          </Pressable>
          <Pressable style={styles.button} title="Submit" onPress={(e)=>{ unprotected(e)}}>
            <Text>unprotected</Text>
          </Pressable>


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
                <TextInput
                    id="username"
                    placeholder="username"
                    type="text"
                    required
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                    // value={credentials.username}
                    // onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    style={styles.formInput}
                />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="password">Password: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="password"
                    placeholder="password"
                    type="text"
                    required
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    // value={credentials.password}
                    // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    style={styles.formInput}
                />

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
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        padding: 8,
        width: "100%",

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
