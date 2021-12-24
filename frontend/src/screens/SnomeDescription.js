import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

import Slider from '../components/Photoslider';
const image = {
  uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
};
const SnomeDescription = () => {
  const [photos, setData] = useState([]);
  const window = useWindowDimensions();

  const createLike = () => {
    console.log('this worked too');
  };

  const styles = StyleSheet.create({
    // SnomeLogo: {
    //   padding: 18,
    //   backgroundColor: "powderblue",
    //   alignSelf: "flex-start",
    //   marginLeft: 20,
    //   marginTop: 20,
    //   marginBottom: 60,
    // },
    scrollView: {
      height: window.height,
      backgroundColor: 'white',
    },
    contentContainer: {
      margin: 25,
      marginTop: 55,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    descriptionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'space-around',
      height: 125,
      width: '100%',
      backgroundColor: 'white',
    },
    descriptionTextHeaders: {
      fontSize: 17,
      width: '50%',
      fontWeight: 'bold',
    },
    ownerContainer: {
      flex: 3,
      backgroundColor: 'yellow',
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Slider photos={photos} />
      <Text
        style={{
          width: '100%',
          fontSize: 25,
          paddingTop: 7,
          textAlign: 'left',
        }}
      >
        Gorgeous 2 bedroom with views
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTextHeaders}>
          4.75&nbsp;&nbsp;
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star-half" size={20} color="black" />
        </Text>
        <Text style={styles.descriptionTextHeaders}>
          Availability{'\n'}
          <Text style={{ fontWeight: 'normal' }}>Dec – April</Text>
        </Text>

        <Text style={styles.descriptionTextHeaders}>
          Rooms{'\n'}
          <Text style={{ fontWeight: 'normal' }}>2 beds 1 bath</Text>
        </Text>
        <Text style={styles.descriptionTextHeaders}>
          Mountain Access{'\n'}
          <Text style={{ fontWeight: 'normal' }}>8 mins Ski-in</Text>
        </Text>
      </View>
      <View style={styles.ownerContainer}></View>
    </ScrollView>
  );
};

export default SnomeDescription;
