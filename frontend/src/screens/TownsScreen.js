import React, { useState, useEffect } from 'react';
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
// import location from '../localtestdata/Projects.json';

const styles = StyleSheet.create({
  containerOne: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 1,
    margin: 20,
    padding: 12,
  },
  containerTwo: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    margin: 20,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  pic: {
    flex: 2,
    width: 300,
    height: 500,
    marginTop: 30,
    padding: 10,
    alignSelf: 'flex-start',
  },
});

function TownsScreen({ route }) {
  //
  const [flexDirection, setflexDirection] = useState('column');

  // ability to use and change data
  var [listing, setData] = useState([]);

  // fetch data from backend and set it to state
  const getListing = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/listing/' + route.params.location_id
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect is a hook that runs a piece of code based on a given condition
  useEffect(() => {
    getListing();
  }, []);

  return (
    <ScrollView>
      <View style={{ padding: 10, flex: 1 }}>
        {listing.map((listing) => (
          <>
            <View style={styles.containerOne}>
              <View id="location" key={listing.snome_id} style={styles.containerTwo}>
                <Text style={{margin: 15, marginTop: 20,}}>{listing.header}</Text>

                {listing.url.map((url) => (
                  <Image style={styles.pic} source={{ uri: url }} />
                ))}

                <Text style={{margin: 15, marginTop: 20,}}> {listing.description}</Text>
              </View>
            </View>
          </>

        ))}
      </View>
    </ScrollView>
  );
}

export default TownsScreen;
