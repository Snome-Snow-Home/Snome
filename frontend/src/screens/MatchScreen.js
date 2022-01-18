import React, { useState } from "react";
<<<<<<< HEAD
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { Dimensions } from 'react-native';
import MyContext from '../Context/MyContext';


const DATA = [
  { id: 1, resort: "parkcity", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season." },
  { id: 2, resort: "crestedbutte", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season." },
  { id: 3, resort: "aspen", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season." },
  { id: 4, resort: "alta", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season." }
]

const Item = ({ location }) => (
=======
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import {Dimensions} from 'react-native';
import UserContext from '../Context/UserContext';


const DATA = [
  {id: 1, resort: "parkcity", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night mfin during ski season."},
  {id: 2, resort: "crestedbutte", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season."},
  {id: 3, resort: "aspen", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season."},
  {id: 4, resort: "alta", header: "Gorgeous Mountain Home w/ Indoor Hot Tub", perks: "ski-in", time_to_mountain: "8 minutes", description: "Conveniently located apartment with a southern view of town, mountain peaks and the ski area. From the parking lot, you are 20 steps away from river and downtown. Ski down 4 O'Clock run and you're across the street from Studio. There is a 3 night min during ski season."}
]

//MATCH DATA
// id,user_id,snome_id,has_been_read
// 1,4,6,TRUE
// 2,6,5,TRUE
// 3,4,3,TRUE
// 4,7,1,TRUE
// 5,6,4,TRUE
// 6,9,1,TRUE
// 7,8,5,TRUE
// 8,10,3,FALSE
// 9,3,4,FALSE
// 10,2,2,FALSE

const Item = ({location}) => (
>>>>>>> upstream/main
  <>
    <ScrollView>
      <View style={styles.item}>
        <View style={styles.img_with_description}>
          <Image style={styles.img} source={require('../pics/snome_location_img.jpg')} />
          <View>
            <Text style={styles.location_info}>{location.resort}</Text>
            <Text style={[styles.location_info, { width: '50%' }]}>{location.header}</Text>
            <Text style={styles.location_info}>{location.perks}</Text>
            <Text style={styles.location_info}>{location.time_to_mountain}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.location}>{location.description}</Text>
        </View>
      </View>
    </ScrollView>
  </>

);

const MatchScreen = () => {

  const renderItem = ({ item }) => (
    <Item location={item} />
  );

  return (
    // <SafeAreaView>
<<<<<<< HEAD
    <ScrollView>
      <MyContext.Consumer>
        {context => (
          <>

            {/* {Object.keys(context.USER_DATA).map(data => (
          <Text>{data}</Text>
        ))} */}

            <Text>'this' user id: {context.user_id}</Text>
            <Text>snome_ids (of matches): {context.match.snome_id}</Text>
            {/* <Text>{context.snome_likes.snome_id}</Text> */}
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </>

        )}
        {/* </SafeAreaView> */}
      </MyContext.Consumer>
    </ScrollView>
=======
    <UserContext.Consumer>
      {context => (
        <>
        {/* {Object.keys(context.USER_DATA).map(data => (
          <Text>{data}</Text>
        ))} */}

        <Text>'this' user id: {context.user_data.user_id}</Text>
        <Text>snome_ids (of matches): {context.user_data.match.snome_id}</Text>
        {/* <Text>{context.snome_likes.snome_id}</Text> */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        </>

      )}
    {/* </SafeAreaView> */}
    </UserContext.Consumer>
>>>>>>> upstream/main
  );
};


const styles = StyleSheet.create({
  location_info: {
    margin: 6,
  },
  topContainer: {
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  item: {
    borderRadius: 4,
    backgroundColor: "oldlace",
    marginBottom: 16,
    // width: Dimensions.get('window').width * 0.4,
    // height: Dimensions.get('window').height * 0.25,
    // textAlign: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  img_with_description: {
    flexDirection: "row"
  },
  img: {
    width: '50%',
    height: '100%',
  },


});

export default MatchScreen

