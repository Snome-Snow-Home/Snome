import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

export default function ErrorMessage (props) {
  const {
    errorName,
    errorMessage,
    errorId,
  } = props

  return (
    <div>
      {errorName ? <Text id={errorId} style={styles.errorBox}>{errorMessage}</Text> : <br/>}
    </div>
  )

}

const styles = {
  errorBox: {
    color: 'red',
    width: 'inherit',
  },
}