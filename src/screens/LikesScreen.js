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
  Row,
  Card
} from 'react-native';

// for testing purposes
import card from "../localtestdata/Projects.json";



const LikesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../pics/Snome.png')}
        style={{ width: 60, height: 60 }}
      />{' '}
      <Text> Snome Likes </Text>
    
              {card.map((card) => (
                <><div class="cards">

                  <Text id="card" key={card.id}>
                 
                  </Text>
            
                    <h3>{card.name}</h3>
                    <h6 >{card.description}</h6>
                    <div >
                      <div >
                        <h6>
                          Technologies Used:
                          {card.tools}
                        </h6>
                      </div>
                    </div>
                    <Button variant="primary" class="button">
                      <a href={card.deployed} target="_blank">
                        Deployed
                      </a>
                    </Button>
                    <Button variant="primary" class="button">
                      <a href={card.repo} target="_blank">
                        Repo
                      </a>
                    </Button>
                  </div></>
                      
                
              ))}
    </SafeAreaView>
                        
                        
                     
                   
                      
                 

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});


export default LikesScreen;
