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
  Card
} from 'react-native';

// for testing purposes
import card from "../localtestdata/Projects.json";

const styles = {
 cards: {
  width: 350,
    height: 300,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,

  },
  tinyLogo: {
    width: 50,
    height: 50,

  },
  pic:{
    width: 300,
    height: 200,
 },

};

const LikesScreen = () => {
  return (
    <ScrollView>

       <Image
       style={styles.tinyLogo}
        source={require('../pics/Snome.png')}
      />
        <Text > Snome Likes </Text>

              {card.map((card) => (

           <View className="container" id="cards"  key={card.id}  style={styles.cards} >
           <ImageBackground source={require('../pics/node.png')} resizeMode="cover" style={styles.image}>
                <Text  >{card.name}</Text>
                 <Image
       style={styles.pic}
        source={require('../pics/Snome.png')}
      />
                <Text > {card.description}</Text>
               
                </ImageBackground>
                {/* <Button href={card.deployed} target="_blank">
                  View Snome ETC.
                      </Button> */}
                      <Button
  //  onPress={() =>
  //   navigation.navigate('Match')
  // }
  title="  View Snome ETC."
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
              </View>
              

              ))}

   </ScrollView>




  );
};




export default LikesScreen;