import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ErrorMessage (props) {
  const {
    errorName,
    errorMessage,
    errorId,
  } = props

  return (
    <View>
      {errorName ? <Text id={errorId} style={styles.errorBox}>{errorMessage}</Text> : <View/>}
    </View>
  )

}

const styles = StyleSheet.create({
  errorBox: {
    color: 'red',
    width: 'inherit',
  }
})