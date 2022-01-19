import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../Context/UserContext'
import axios from 'axios';


export default function Login() {

    const navigation = useNavigation()
    const context = useContext(UserContext)

    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
      });

    const B = (props) => <Text style={{ fontWeight: 'bold', color: "#448EB1" }}>{props.children}</Text>

    const login = async (e) => {
        e.preventDefault()
        axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data:
            credentials
          ,
        })
        .then(res => {
            console.log(res.data);
            // localStorage.setItem('token', res.data.token);
            // console.log(res.data.token)
            // setJwt(res.data.token);
            // setLogged_in(true)
          })
        .catch( err => {
          console.log(err)
        })
      }

    return (
        <View
            // style={styles.container}
            style={{
                width: "95%",
                maxWidth: 400,
                margin: 10,
            }}
        >
            <Image
                source={require('../../assets/Snome.png')}
                style={{
                    width: 100,
                    height: 100,
                }}
            />

            <Text>{context.user_data.is_logged_in ? 'erer' : 'tttt'}</Text>

            <Text style={{
                fontSize: 20,
                textAlign: "center",
                margin: 10
            }}>Login</Text >
            <ScrollView
            // onSubmit={handleSubmit}
            >

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="name">Username: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="name"
                    placeholder="Name"
                    type="text"
                    required
                    // value={nameText}
                    // onChangeText={setNameText}
                    value={credentials.name}
                    onChange={(e) => setCredentials({...credentials, name: e.target.value})}
                    style={styles.formInput}
                />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="name">Password: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="name"
                    placeholder="Name"
                    type="text"
                    required
                    //value={nameText}
                    // onChangeText={setNameText}
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    style={styles.formInput}
                />

                <Pressable style={styles.button} title="Submit"
                    // onPress={handleSubmit}
                    onPress={(e)=>{ login(e), console.log(credentials, "hello")}}
                >

                    <Text>Lets get Snomey</Text></Pressable>

                <Text style={styles.link}
                    onPress={() => { navigation.navigate('CreateUser') }}
                >New to Snome?  <B>
                        Sign Up Here</B></Text>

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
