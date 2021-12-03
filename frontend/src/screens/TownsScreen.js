import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  ScrollView,
  Row,
  ImageBackground,
} from 'react-native';
import { Dimensions } from 'react-native';
// for video player
// import YoutubePlayer from 'react-native-youtube-iframe';

// for testing purposes
// import locations from '../localtestdata/Projects.json';

const styles = {
  container2: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 3,
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1",
    padding: 8,
  },
  container: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',

    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1",
    padding: 8,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  pic: {
    width: 100,
    height: 100,
  },
};

function TownsScreen() {

  //
  const [flexDirection, setflexDirection] = useState('column');

  // ability to use and change data
  const [locations, setData] = useState([]);


// fetch data from backend and set it to state
  const getLocations = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/location'
      );
      const json = await response.json();
      setData(json);

    } catch (error) {
      console.error(error);
    }
  };

  // useEffect is a hook that runs a piece of code based on a given condition
  useEffect(() => {
    getLocations();
  }, []);

 //test

  return (
    <ScrollView>
      <Image style={styles.tinyLogo} source={require('../pics/Snome.png')} />
      <View style={{ padding: 10, flex: 1 }}>
        {locations.map((locations) => (
          <>
            <View style={styles.container2}>
              <View id="locations" key={locations.id} style={styles.container}>
                <Text>{locations.name} </Text>

                <Image
                  style={styles.pic}
                  source={require('../pics/Snome.png')}
                />
                <Text> {locations.description}</Text>
              </View>
            </View>
          </>
        ))}
      </View>
      {/* <View>
        <YoutubePlayer height={150} play={true} videoId={'frvXANSaSec'} />
      </View> */}
    </ScrollView>
  );
}

export default TownsScreen;
