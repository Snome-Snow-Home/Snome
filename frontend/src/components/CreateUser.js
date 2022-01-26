import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '@mantine/hooks';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
// import FormInput from './FormInput'
// import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  link: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#464545',
    fontFamily: 'Arial',
  },
  formInput: {
    color: 'black',
    backgroundColor: 'lightblue',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  invalidInput: {
    color: 'red',
    backgroundColor: 'lightgray',
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    width: '95%',
  },
  label: {
    margin: 5,
    color: '#464545',
    fontFamily: 'Arial',
  },
  required: {
    margin: 5,
    color: 'gray',
    fontFamily: 'Arial',
    fontSize: 14,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#448EB1',
    color: 'white',
    fontFamily: 'Arial',
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 20,
  },
});

export default function CreateUser(props) {
  // const [error, setError] = useState(null);
  const [nameText, setNameText] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConformPassword] = useState('');

  const navigation = useNavigation();

  const B = (props) => (
    <Text style={{ fontWeight: 'bold', color: '#448EB1' }}>
      {props.children}
    </Text>
  );

  // const form = useForm({
  //     initialValues: {
  //         name: '',
  //         email: '',
  //         address: '',
  //         city: '',
  //         state: '',
  //         zipCode: '',
  //         password: '',
  //         confirmPassword: '',
  //     },
  // validationRules: {
  //     name: (value) => /^[a-z ,.'-]+$/i.test(value),
  //     email: (value) => /^\S+@\S+$/.test(value),
  //     city: (value) =>
  //         /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(
  //             value
  //         ),
  //     state: (value) => value.trim().length >= 2,
  //     zipCode: (value) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(value),
  //     password: (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(value),

  //     confirmPassword: (val, values) => val === values.password,
  // },
  // });

  function handleSubmit(e) {
    e.preventDefault;
    // form.validate()
    console.log('user created');
    const userData = {
      nameText: nameText,
      email: email,
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
      password: password,
      confirmedPassword: confirmPassword,
    };
    console.log(userData);
    axios.post(`http://localhost:3000/signup`, userData)
    // console.log("values: ", values)
    //should this be form.error?
    // console.log("errors: ", form.errors)
  }

  return (
    <ScrollView style={{ width: '95%', maxWidth: 400, margin: 10 }}>
      <Image
        source={require('../../assets/Snome.png')}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          margin: 5,
          fontFamily: 'Arial',
        }}
      >
        New User? Sign up here
      </Text>
      <Text
        style={styles.link}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Already have an account <B>Go to Login</B>
      </Text>

      <ScrollView onSubmit={handleSubmit}>
        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="name">
            Name:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="name"
          placeholder="Name"
          type="text"
          required
          value={nameText}
          onChangeText={setNameText}
          style={styles.formInput}
          // onChange={(event) => {
          //     form.setFieldValue('name', event.target.value);
          //     form.validate("name")
          // }}
          //should this be unpluralized again>? errors->error
          // style={form.errors.email ? styles.invalidInput : styles.formInput}
        />
        {/* <ErrorMessage errorName={form.errors.name} errorId={"name-errorBox"} errorMessage={"includes invalid characters"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="email">
            Email:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="email"
          placeholder="Email"
          type="text"
          required
          // name='email'
          value={email}
          onChangeText={setEmail}
          style={styles.formInput}
          // onChange={(event) => form.setFieldValue('email', event.target.value)}
          // style={form.errors.email ? styles.invalidInput : styles.formInput}
        />

        {/* <ErrorMessage errorName={form.errors.email} errorId={"email-errorBox"} errorMessage={"invalid email address"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="address">
            Address:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="address"
          placeholder="Address"
          type="text"
          required
          //name='address'
          value={address}
          onChangeText={setAddress}
          style={styles.formInput}
          // onChange={(event) => form.setFieldValue('address', event.target.value)}
        />

        {/* <ErrorMessage errorName={form.errors.address} errorId={"address-errorBox"} errorMessage={"invalid address"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="city">
            City:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="city"
          placeholder="City"
          type="text"
          required
          //name='city'
          value={city}
          onChangeText={setCity}
          style={styles.formInput}
          // value={form.values.city}
          // onChange={(event) => form.setFieldValue('city', event.target.value)}
        />

        {/* <ErrorMessage errorName={form.errors.city} errorId={"city-errorBox"} errorMessage={"invalid city name"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="state">
            State:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="state"
          placeholder="State"
          type="text"
          required
          maxLength="2"
          autoCapitalize="characters" // why doesn't this work?
          //name='state'
          value={state}
          onChangeText={setState}
          style={styles.formInput}
          // onChange={(event) => form.setFieldValue('state', event.target.value)}
        />

        {/* <ErrorMessage errorName={form.errors.state} errorId={"state-errorBox"} errorMessage={"Not a valid US state"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="zipCode">
            Zip Code:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="zipCode"
          placeholder="Zip Code"
          type="text"
          required
          //name='zipCode'
          value={zipCode}
          onChangeText={setZipcode}
          // onChange={(event) =>
          //     form.setFieldValue('zipCode', event.target.value)
          // }
          style={styles.formInput}
        />

        {/* <ErrorMessage errorName={form.errors.zipCode} errorId={"zipCode-errorBox"} errorMessage={"Must be a 5- or 9-digit number"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="password">
            Password:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="password"
          placeholder="Need a number, a letter and a special character"
          type="password"
          required
          autoComplete="new-password"
          secureTextEntry="true"
          // name='password'
          value={password}
          onChangeText={setPassword}
          //onChange={handleInputChange}
          // onChange={(event) =>
          //     form.setFieldValue('password', event.target.value)
          // }
          style={styles.formInput}
        />
        {/* <ErrorMessage errorName={form.errors.password} errorId={"password-errorBox"} errorMessage={"8-16 characters, Must contain a number, a letter and a special character"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="confirmPassword">
            Confirm Password:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          required
          autoComplete="new-password"
          secureTextEntry="true"
          //name='confirmPassword'
          value={confirmPassword}
          onChangeText={setConformPassword}
          //onChange={handleInputChange}
          // onChange={(event) =>
          //     form.setFieldValue('confirmPassword', event.target.value)
          // }
          style={styles.formInput}
        />
        {/* <ErrorMessage errorName={form.errors.confirmPassword} errorId={"confirmPassword-errorBox"} errorMessage={"Passwords must match"} /> */}

        <Pressable style={styles.button} title="Submit" onPress={handleSubmit}>
          {/* // {form.onSubmit((values) => handleSubmit(values))} */}
          <Text>Submit</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
  );
}

//should change the validation so that it occurs after unfocus on each text box

{
  /* <FormInput
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
/> */
}
