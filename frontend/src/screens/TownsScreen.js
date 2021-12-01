import React from 'react';
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
// for video player
// import YoutubePlayer from 'react-native-youtube-iframe';

// for testing purposes
import locations from '../localtestdata/Projects.json';

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
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
  // const [flexDirection, setflexDirection] = useState("column");
  return (
    <ScrollView>
      <Image style={styles.tinyLogo} source={require('../pics/Snome.png')} />

      {locations.map((locations) => (
        <>
          <View id="locations" key={locations.id} style={styles.container}>
            <Text>{locations.name}</Text>
            <Image style={styles.pic} source={require('../pics/Snome.png')} />
            <Text> {locations.description}</Text>
          </View>
        </>
      ))}
      {/* <View>
        <YoutubePlayer height={150} play={true} videoId={'frvXANSaSec'} />
      </View> */}
    </ScrollView>
  );
}

export default TownsScreen;
