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
  Card
} from 'react-native';

// for testing purposes
import card from "../localtestdata/Projects.json";

const styles = StyleSheet.create({
 cards: {
  width: 350,
    height: 350,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pic:{
    width: 250,
    height: 150,

  }
  
});

const LikesScreen = () => {
  return (
    <ScrollView>
    
      <span>   <Image
       style={styles.tinyLogo}
        source={require('../pics/Snome.png')}
      />Snome Likes </span>
    
              {card.map((card) => (
           <View className="container" id="cards"  key={card.id}  style={styles.cards} >
         
                <h1>{card.name} <Image
       style={styles.pic}
        source={require('../pics/Snome.png')}
      /></h1>
                <h5> {card.description}</h5>
                <button> <a href={card.deployed} target="_blank">
                  View Snome ETC.
                      </a></button>
              </View>
           
              ))}
   
   </ScrollView>
                   
                      
                 

  );
};




export default LikesScreen;
