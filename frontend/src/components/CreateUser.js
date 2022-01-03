import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Pressable } from 'react-native';
import { useForm } from '@mantine/hooks';
import ErrorMessage from './ErrorMessage'
// import { StatusBar } from 'expo-status-bar';
// import axios from 'axios';
// import FormInput from './FormInput'

// const Label = styled.label`
//   margin: 5px;
//   color: #464545;
//   font-family: 'Arial';
// `;

// const Required = styled.div`
//   margin: 5px;
//   color: gray;
//   font-family: 'Arial';
//   font-size: 14px;
// `;

// const Text = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

const styles = StyleSheet.create({
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
    invalidInput: {
        color: "red",
        backgroundColor: "lightgray",
        borderColor: "red",
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        padding: 8,
        width: "95%",
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


export default function CreateUser(props) {
    const [error, setError] = useState(null);

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            password: '',
            confirmPassword: '',
        },
        validationRules: {
            name: (value) => /^[a-z ,.'-]+$/i.test(value),
            email: (value) => /^\S+@\S+$/.test(value),
            city: (value) =>
                /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(
                    value
                ),
            state: (value) => value.trim().length >= 2,
            zipCode: (value) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(value),

            confirmPassword: (val, values) => val === values.password,
        },
    });

    function handleSubmit(values) {
        form.validate()
        console.log("values: ", values)
        //should this be form.error?
        console.log("errors: ", form.errors)
    }

    return (
        <View style={{ width: "95%", maxWidth: "400px", margin: 5 }}>
            <Image
                source={require('../../assets/Snome.png')}
                style={{
                    width: 100,
                    height: 100,
                }}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>New User? Sign up here</Text>
            <View
                onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="name">Name: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="name"
                    placeholder="Name"
                    type="text"
                    required
                    value={form.values.name}
                    autoCorrect="false"
                    onChange={(event) => {
                        form.setFieldValue('name', event.target.value);
                        form.validate("name")
                    }}
                    //should this be unpluralized again>? errors->error
                    style={form.errors.email ? styles.invalidInput : styles.formInput}
                />
                <ErrorMessage errorName={form.errors.name} errorId={"name-errorBox"} errorMessage={"includes invalid characters"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="email">Email: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="email"
                    placeholder="Email"
                    type="text"
                    required
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.target.value)}
                    style={form.errors.email ? styles.invalidInput : styles.formInput}
                />
                <ErrorMessage errorName={form.errors.email} errorId={"email-errorBox"} errorMessage={"invalid email address"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="address">Address: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="address"
                    placeholder="Address"
                    type="text"
                    required
                    value={form.values.address}
                    onChange={(event) => form.setFieldValue('address', event.target.value)}
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.address} errorId={"address-errorBox"} errorMessage={"invalid address"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="city">City: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="city"
                    placeholder="City"
                    type="text"
                    required
                    value={form.values.city}
                    onChange={(event) => form.setFieldValue('city', event.target.value)}
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.city} errorId={"city-errorBox"} errorMessage={"invalid city name"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="state">State: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="state"
                    placeholder="State"
                    type="text"
                    required
                    maxLength="2"
                    autoCapitalize="characters" // why doesn't this work?
                    //removed .toUpperCase() to fix error in value and onChange props
                    value={(form.values.state)}
                    onChange={(event) => form.setFieldValue('state', event.target.value)}
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.state} errorId={"state-errorBox"} errorMessage={"Not a valid US state"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="zipCode">Zip Code: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="zipCode"
                    placeholder="Zip Code"
                    type="text"
                    required
                    value={form.values.zipCode}
                    onChange={(event) =>
                        form.setFieldValue('zipCode', event.target.value)
                    }
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.zipCode} errorId={"zipCode-errorBox"} errorMessage={"Must be a 5- or 9-digit number"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="password">Password: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="password"
                    placeholder="Need a number, a letter and a special character"
                    type="password"
                    required
                    autoComplete="new-password"
                    secureTextEntry="true"
                    value={form.values.password}
                    onChange={(event) =>
                        form.setFieldValue('password', event.target.value)
                    }
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.password} errorId={"password-errorBox"} errorMessage={"8-16 characters, Must contain a number, a letter and a special character"} />

                <Text style={styles.horizontal}>
                    <Text style={styles.label} htmlFor="confirmPassword">Confirm Password: </Text>
                    <Text style={styles.required}>*Required</Text>
                </Text>
                <TextInput
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    autoComplete="new-password"
                    secureTextEntry="true"
                    value={form.values.confirmPassword}
                    onChange={(event) =>
                        form.setFieldValue('confirmPassword', event.target.value)
                    }
                    style={styles.formInput}
                />
                <ErrorMessage errorName={form.errors.confirmPassword} errorId={"confirmPassword-errorBox"} errorMessage={"Passwords must match"} />

                <Pressable style={styles.button} title="Submit" onPress={form.onSubmit((values) => handleSubmit(values))}><Text>Submit</Text></Pressable>
            </View>
        </View>
    );
}

//should change the validation so that it occurs after unfocus on each text box

{/* <FormInput
Label="Name"
id="name"
// placeholder="Name"
type="text"
required
value={form.values.name}
autoCorrect="false"
onChange={(event) => form.setFieldValue('name', event.target.value)}
errorName={form.errors.name}
errorId={"name-errorBox"}
errorMessage={"includes invalid characters"}
/> */}