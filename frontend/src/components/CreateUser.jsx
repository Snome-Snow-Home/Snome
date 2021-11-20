import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import styled from 'styled-components'


import ErrorMessage from './ErrorMessage'
import FormInput from './FormInput'

const Label = styled.label`
  margin: 5px;
  color: #464545;
  font-family: 'Arial';
`;

const Required = styled.div`
  margin: 5px;
  color: gray;
  font-family: 'Arial';
  font-size: 14px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const styles = {
  formInput: {
    color: "black",
    backgroundColor: "lightblue",
    border: "1px solid lightgray",
    borderRadius: "8px",
    padding: "8px",
    width: "100%",
  },
  invalidInput: {
    color: "red",
    backgroundColor: "lightgray",
    border: "2px solid red",
    borderRadius: "8px",
    padding: "8px",
    width: "95%",
  },
}


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
    console.log("values: ",values)
    console.log("errors: ", form.errors)
  }

  return (
    <div
    style={{
      width: "95%",
      maxWidth: "400px",
    }}
    >
      <img
        src={require('../assets/Snome.png')}
        style={{
          width: "150px",
        }}
      />
      <h2>New User? Sign up here</h2>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >

        <Horizontal>
          <Label htmlFor="name">Name: </Label>
          <Required>*Required</Required>
        </Horizontal>
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
          style={form.errors.email ? styles.invalidInput : styles.formInput}
        />
        <ErrorMessage errorName={form.errors.name} errorId={"name-errorBox"} errorMessage={"includes invalid characters"} />

        <Horizontal>
          <Label htmlFor="email">Email: </Label>
          <Required>*Required</Required>
        </Horizontal>
        <TextInput
          id="email"
          placeholder ="Email"
          type="text"
          required
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          style={form.errors.email ? styles.invalidInput : styles.formInput}
        />
        <ErrorMessage errorName={form.errors.email} errorId={"email-errorBox"} errorMessage={"invalid email address"} />

        <Horizontal>
          <Label htmlFor="address">Address: </Label>
          <Required>*Required</Required>
        </Horizontal>
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

        <Horizontal>
          <Label htmlFor="city">City: </Label>
          <Required>*Required</Required>
        </Horizontal>
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

        <Horizontal>
          <Label htmlFor="state">State: </Label>
          <Required>*Required</Required>
        </Horizontal>
        <TextInput
          id="state"
          placeholder="State"
          type="text"
          required
          maxLength="2"
          autoCapitalize="characters" // why doesn't this work?
          value={(form.values.state).toUpperCase()}
          onChange={(event) => form.setFieldValue('state', event.target.value.toUpperCase())}
          style={styles.formInput}
        />
        <ErrorMessage errorName={form.errors.state} errorId={"state-errorBox"} errorMessage={"Not a valid US state"} />

        <Horizontal>
          <Label htmlFor="zipCode">Zip Code: </Label>
          <Required>*Required</Required>
        </Horizontal>
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

        <Horizontal>
          <Label htmlFor="password">Password: </Label>
          <Required>*Required</Required>
        </Horizontal>
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

        <Horizontal>
          <Label htmlFor="confirmPassword">Confirm Password: </Label>
          <Required>*Required</Required>
        </Horizontal>
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

        {/* <button type="submit" title="Submit">Submit</button> */}
        <Button title="Submit" onPress={form.onSubmit((values) => handleSubmit(values))}>Submit</Button>
      </form>
    </div>
  );
}

//should change the validation so that it occurs after unfocus on each text box

{/* <FormInput
label="Name"
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