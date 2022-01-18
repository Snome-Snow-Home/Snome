import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Dimensions} from 'react-native';

const FeaturedLocations = () => {
  const [flexDirection, setflexDirection] = useState("column");

  return (
    <Grid
      label="flexDirection"
      values={["parkcity", "aspen", "crestedbutte", "alta"]}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    >
    </Grid>
  );
};

const Grid = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            styles.location,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  location: {
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    // flex: 1,
    borderRadius: 4,
    backgroundColor: "oldlace",
    // alignSelf: "flex-start",
    // marginHorizontal: "1%",
    marginBottom: 16,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default v