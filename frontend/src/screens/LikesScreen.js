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

const LikesScreen = () => {
  return (
    <ScrollView>
    
      <span>   <Image
        source={require("../pics/Snome.png")}
      />Snome Likes </span>
    
              {card.map((card) => (
            <div className="container" id="cards"  key={card.id} >
         
                <h1>{card.name}</h1>
                <p class="price">$19.99</p>
                <p>{card.description}</p>
                <p><button> <a href={card.deployed} target="_blank">
                    LIKE BUTTON ETC.
                      </a></button></p>
              </div>
           
              ))}
   
   </ScrollView>
                   
                      
                 

  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     marginHorizontal: 16
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   }
  
// });


export default LikesScreen;
