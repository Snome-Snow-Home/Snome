import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import {Dimensions} from 'react-native';

const LikesScreen = () => {
  const [flexDirection, setflexDirection] = useState("column");

  return (
    <Grid
      values={["parkcity", "aspen", "crestedbutte", "alta"]}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    >
    </Grid>
//     <>
//     <ScrollView>
//     <View style={{height:300, backgroundColor:'black', marginBottom:20}}>

//     </View>
//         <View style={{height:300, backgroundColor:'black', marginBottom:20}}>

//         </View>

//             </ScrollView>
//             <View style={{height:300, backgroundColor:'black', marginBottom:20}}>

// </View>
//             </>

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

  {/* Top Container */}
  <View style={[styles.topContainer]}>
  {children}
    <View>
      <Text style={styles.SnomeLogo}>Snome Logo</Text>
    </View>
  </View>

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

  </View>
);

const styles = StyleSheet.create({
  SnomeLogo: {
    padding:18,
    backgroundColor: "powderblue",
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 60,
  },
  topContainer: {
    // flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
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
    // flex:1,
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

export default LikesScreen

