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

const styles = StyleSheet.create({
 cards: {
  width: 450,
    height: 400,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,
  
  },
  tinyLogo: {
    width: 50,
    height: 50,

  },
  pic:{
    width: 400,
    height: 200,
 },

});

const LikesScreen = () => {
  return (
    <ScrollView>
    
      <div >   <Image
       style={styles.tinyLogo}
        source={require('../pics/Snome.png')}
      />Snome Likes </div>
    
              {card.map((card) => (
                
           <View className="container" id="cards"  key={card.id}  style={styles.cards} >
           <ImageBackground source={require('../pics/node.png')} resizeMode="cover" style={styles.image}>
                <h1  >{card.name} <Image
       style={styles.pic}
        source={require('../pics/Snome.png')}
      /></h1>
                <h3 > {card.description}</h3>
                <button> <a href={card.deployed} target="_blank">
                  View Snome ETC.
                      </a></button>
                </ImageBackground>
              </View>
           
              ))}
   
   </ScrollView>
                   
                      
                 

  );
};




export default LikesScreen;

