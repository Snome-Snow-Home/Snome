import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

const Label = styled.label`
  margin: 5px;
  color: #464545;
  font-family: 'Arial';
`;

const Img = styled.img`
height: 2em;
width: 2em;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChangingInput = styled.input`
    color: black;
    background-color: lightblue;
    border: ${(props) => props.errorName ? "1px solid red" : "1px solid gray"};
    border-radius: 8px;
    padding: 8px;
    width: 95%;
`;

export default function FormInput(props) {
  const {
    id,
    type,
    label,
    hint,
    value,
    error,
    errorName,
    errorMessage,
    errorId,
    htmlFor,
    onChange,
    ...passThroughProps //does spreading other props remoev them from passThru?
  } = props

  return (
    <div>
    <Label htmlFor={id}>{label}: </Label>
      <input
      type={type || "text"}
        value={value}
        style={{
          color: 'black',
          backgroundColor: 'lightblue',
          borderRadius: '8px',
          padding: '8px',
          width: '95%',
          border: props.errorName ? "1px solid red" : "1px solid gray",
        }}
        onChange={onChange}
        props={passThroughProps}
      />


      {/* {errorName ?
      <Img src="https://img.icons8.com/color/48/000000/delete-sign--v1.png"/> :
      <Img src="https://img.icons8.com/color/48/000000/checkmark--v2.png"/>
      } */}

    <ErrorMessage errorName={errorName} errorMessage={errorMessage} />
      </div>
  )
}