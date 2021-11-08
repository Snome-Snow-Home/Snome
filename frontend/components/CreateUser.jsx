import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm } from '@mantine/hooks';
import axios from 'axios';

export default function CreateUser (props) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
    },
    validationRules: {
      name: (value) => /^[a-z ,.'-]+$/i.test(value),
      email: (value) => /^\S+@\S+$/.test(value),
      city: (value) => /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(value),
      state: (value) => value.trim().length >= 2,
      zipCode: (value) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(value),
    }
  })

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <label htmlFor="name">Name: </label>
        <input id="name"
          placeholder="Name"
          type="text"
          required
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input id="email"
          placeholder="Email"
          type="text"
          required
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
        />
        <input id="address"
          placeholder="Address"
          type="text"
          required
          value={form.values.address}
          onChange={(event) => form.setFieldValue('address', event.target.value)}
        />
        <input id="city"
          placeholder="City"
          type="text"
          required
          value={form.values.city}
          onChange={(event) => form.setFieldValue('city', event.target.value)}
        />
        <input id="state"
          placeholder="State"
          type="text"
          required
          value={form.values.state}
          onChange={(event) => form.setFieldValue('state', event.target.value)}
        />
        <input id="zipCode"
          placeholder="Zip Code"
          type="text"
          required
          value={form.values.zipCode}
          onChange={(event) => form.setFieldValue('zipCode', event.target.value)}
        />
        <input id="password"
          placeholder="Password (must be 8-16 chars)"
          type="password"
          required
          minLength="8"
          maxLength="16"
          autoComplete="new-password"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.target.value)}
        />
        <input id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          required
          autoComplete="new-password"
          value={form.values.confirmPassword}
          onChange={(event) => form.setFieldValue('confirmPassword', event.target.value)}
        />
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}