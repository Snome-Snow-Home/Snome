import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useForm } from '@mantine/hooks';
import axios from 'axios';
import SnomeIcon from '../assets/Snome.png'
import ErrorMessage from './ErrorMessage'

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
  }, //why won't this work?
  errorBox: {
    color: 'red',
  },
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
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value),
      confirmPassword: (val, values) => val === values.password,
    },
  });

  function handleSubmit(values) {
    console.log("values: ",values)
    form.validate()
    console.log("errors: ", form.errors)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "95%",
    }}>
      <img src={SnomeIcon}/>
      <h2>New User? Sign up here</h2>
      <form
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   // flex: 1,
        //   width: "95%",
        // }}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        // onChange={()=> console.log(form.errors)}
      >

        <label htmlFor="name">Name: </label>
        <TextInput
          id="name"
          placeholder="Name"
          type="text"
          // required
          value={form.values.name}
          autoCorrect="false"
          onChange={(event) => form.setFieldValue('name', event.target.value)}
        />
        <ErrorMessage errorName={form.errors.name} errorId={"name-errorBox"} errorMessage={"includes invalid characters"} />

        <label htmlFor="email">Email: </label>
        <TextInput
          id="email"
          placeholder="Email"
          type="text"
          // required
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
        />
        <ErrorMessage errorName={form.errors.email} errorId={"email-errorBox"} errorMessage={"invalid email address"} />

        <label htmlFor="address">Address: </label>
        <TextInput
          id="address"
          placeholder="Address"
          type="text"
          required
          value={form.values.address}
          onChange={(event) =>
            form.setFieldValue('address', event.target.value)
          }
        />
        <ErrorMessage errorName={form.errors.address} errorId={"address-errorBox"} errorMessage={"invalid address"} />

        <label htmlFor="city">City: </label>
        <TextInput
          id="city"
          placeholder="City"
          type="text"
          required
          value={form.values.city}
          onChange={(event) => form.setFieldValue('city', event.target.value)}
        />
        <ErrorMessage errorName={form.errors.city} errorId={"city-errorBox"} errorMessage={"invalid city name"} />

        <label htmlFor="state">State: </label>
        <TextInput
          id="state"
          placeholder="State"
          type="text"
          required
          maxLength="2"
          autoCapitalize="characters" // why doesn't this work?
          value={(form.values.state).toUpperCase()}
          onChange={(event) => form.setFieldValue('state', event.target.value.toUpperCase())}
        />
        <ErrorMessage errorName={form.errors.state} errorId={"state-errorBox"} errorMessage={"Not a valid US state"} />


        <label htmlFor="zipCode">Zip Code: </label>
        <TextInput
          id="zipCode"
          placeholder="Zip Code"
          type="text"
          required
          value={form.values.zipCode}
          onChange={(event) =>
            form.setFieldValue('zipCode', event.target.value)
          }
        />
        <ErrorMessage errorName={form.errors.zipCode} errorId={"zipCode-errorBox"} errorMessage={"Must be a 5- or 9-digit number"} />


        <label htmlFor="password">Password: </label>
        <TextInput
          id="password"
          placeholder="Password (must be 8-16 chars)"
          type="password"
          required
          minLength="8"
          maxLength="16"
          autoComplete="new-password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue('password', event.target.value)
          }
        />
        <ErrorMessage errorName={form.errors.password} errorId={"password-errorBox"} errorMessage={"Password should contain 1 number, 1 letter and 8-16 characters"} />


        <label htmlFor="confirmPassword">Confirm Password: </label>
        <TextInput
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          required
          autoComplete="new-password"
          value={form.values.confirmPassword}
          onChange={(event) =>
            form.setFieldValue('confirmPassword', event.target.value)
          }
        />
        <ErrorMessage errorName={form.errors.confirmPassword} errorId={"confirmPassword-errorBox"} errorMessage={"Passwords must match"} />

        <button type="submit" title="Submit">Submit</button>
      </form>
    </div>
  );
}
