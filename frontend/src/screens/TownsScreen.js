
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

// for testing purposes
import locations from "../localtestdata/Projects.json";

const styles = {
 
  container: {
    width: 125,
    height: 200,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,
   
    
    
   
    flexWrap: "wrap",
  },
  tinyLogo: {
    width: 10,
    height: 10,

  },
  pic:{
    width: 100,
    height: 100,
 },

};

 function TownsScreen() {
  return (
    <ScrollView >

       <Image
       style={styles.tinyLogo}
        source={require('../pics/Snome.png')}
      />

              {locations.map((locations) => (

           <><View id="locations" key={locations.id} style={styles.container}>
                  <Text>{locations.name}</Text>
                  <Image
                    style={styles.pic}
                    source={require('../pics/Snome.png')} />
                  <Text> {locations.description}</Text>
                </View></>
              ))}

   </ScrollView>

  );
};

 export default TownsScreen;
