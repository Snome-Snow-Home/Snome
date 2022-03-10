import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '@mantine/hooks';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
//import { ButtonUI } from './ButtonUI';
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
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    nameText: '',
    username: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
  });

  const {
    nameText,
    username,
    email,
    address,
    city,
    state,
    zipCode,
    password,
    confirmPassword,
  } = userData;

  //grand value of text input from user and sets the state to that value
  const handleOnChangeText = (value, fieldName) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  //unique component to bold letters
  const B = (props) => (
    <Text style={{ fontWeight: 'bold', color: '#448EB1' }}>
      {props.children}
    </Text>
  );

  const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
  };

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 4500);
  };

  const isValidEmail = (value) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(value);
  };

  const emailStatus = async (email) => {
    try {
      const emailStatusRes = await fetch('http://localhost:3000/user_email/exists/' + email);
      const emailJsonRes = await emailStatusRes.json();
      return emailJsonRes.case;
    } catch (error) {
      console.error(error);
    }
  };

  const userNmaeStatus = async (userName) => {
    try {
      const userNameStatusRes = await fetch('http://localhost:3000/user_name/exists/' + userName);
      const userNameJsonRes = await userNameStatusRes.json();
      return userNameJsonRes.case;
    } catch (error) {
      console.error(error);
    }
  };

  const isValidForm = async () => {
    const status = {
      email: await emailStatus(email),
      userName: await userNmaeStatus(username),
    };

    //we accept only if all input fields have value
    if (!isValidObjField(userData)) {
      return updateError('All fields required!', setError);
    }
    //only valid email allowed
    if (!isValidEmail(email)) {
      return updateError('Please enter a valid email', setError);
    }
    //password must have 8 character
    if (!password.trim() || password.length < 8) {
      return updateError('Please must have at least 8 characters!', setError);
    }
    //password must match confirm password
    if (password !== confirmPassword) {
      return updateError('Please make sure passwords match', setError);
    }
    //here we could query to make sure the username does not already exist
    //username !== username query to DB
    if (status.email) {
      return updateError(
        'This email exists. Please, use another email address',
        setError
      );
    }
    if (status.userName) {
      return updateError(
        'This user name has been taken, please use another one',
        setError
      );
    }
    return true;
  };

  function handleSubmit(e) {
    e.preventDefault;
    if (isValidForm()) {
      console.log(userData);
      axios.post(`http://localhost:3000/signup`, userData);
    }
  }

  return (
    <ScrollView style={{ width: '95%', maxWidth: 400, margin: 10 }}>
      <Image
        source={require('../../assets/Snome.png')}
        style={{ width: 50, height: 50 }}
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
        {error ? <Text style={styles.invalidInput}>{error}</Text> : null}
        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="name">
            Your Name:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="name"
          placeholder="Name"
          type="text"
          required
          autoCapitalize="none"
          autoCorrect={false}
          value={nameText}
          // onChangeText={setNameText}
          onChangeText={(value) => handleOnChangeText(value, 'nameText')}
          style={styles.formInput}
        // style={form.errors.email ? styles.invalidInput : styles.formInput}
        />
        {/* <ErrorMessage errorName={form.errors.name} errorId={"name-errorBox"} errorMessage={"includes invalid characters"} /> */}

        <Text style={styles.horizontal}>
          <Text style={styles.label} htmlFor="username">
            Choose a Username:{' '}
          </Text>
          <Text style={styles.required}>*Required</Text>
        </Text>
        <TextInput
          id="username"
          placeholder="Username"
          type="text"
          required
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          //onChangeText={setUsername}
          onChangeText={(value) => handleOnChangeText(value, 'username')}
          style={styles.formInput}
        // style={form.errors.email ? styles.invalidInput : styles.formInput}
        />

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
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          //onChangeText={setEmail}
          onChangeText={(value) => handleOnChangeText(value, 'email')}
          style={styles.formInput}
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
          autoCapitalize="none"
          autoCorrect={false}
          value={address}
          //onChangeText={setAddress}
          onChangeText={(value) => handleOnChangeText(value, 'address')}
          style={styles.formInput}
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
          autoCapitalize="none"
          autoCorrect={false}
          value={city}
          //onChangeText={setCity}
          onChangeText={(value) => handleOnChangeText(value, 'city')}
          style={styles.formInput}
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
          maxLength={2}
          autoCorrect={false}
          value={state}
          //onChangeText={setState}
          onChangeText={(value) => handleOnChangeText(value, 'state')}
          style={styles.formInput}
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
          value={zipCode}
          //onChangeText={setZipcode}
          onChangeText={(value) => handleOnChangeText(value, 'zipCode')}
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
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry={true}
          value={password}
          //onChangeText={setPassword}
          onChangeText={(value) => handleOnChangeText(value, 'password')}
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
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="new-password"
          secureTextEntry={true}
          value={confirmPassword}
          //onChangeText={setConformPassword}
          onChangeText={(value) => handleOnChangeText(value, 'confirmPassword')}
          style={styles.formInput}
        />

        <TouchableOpacity
          style={styles.button}
          title="Submit"
          clearButtonMode="always"
          onPress={handleSubmit}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
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
