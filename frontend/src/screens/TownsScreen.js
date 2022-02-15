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
  TouchableOpacity,
  Row,
  ImageBackground,
} from 'react-native';
import { Dimensions } from 'react-native';
// for video player
// import YoutubePlayer from 'react-native-youtube-iframe';

// for testing purposes
// import location from '../localtestdata/Projects.json';


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

  //func here needs to be post request to the db to add this listing to users likes
  const addtoLikes = async () => {
    try {
      console.log("you like me!")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      {listing.map((listing) => (
        <React.Fragment key={listing.snome_id}>
          <View id="listing" style={styles.containerOne}>
            <Text style={{ margin: 15, marginTop: 20 }}>{listing.header}</Text>
            {listing.url.map((url, index) => (
              <React.Fragment key={index}>
                <Image style={styles.pic} source={{ uri: url }} />
              </React.Fragment>
            ))}
            <Text style={{ margin: 15, marginTop: 20 }}>
              {'\n'}
              {listing.description}
              {'\n'}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} title="like this!" onPress={addtoLikes}>Like This!</TouchableOpacity>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#448EB1",
    color: "white",
    fontFamily: 'Arial',
    width: "50%",
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: 20
  }
});

export default TownsScreen;
