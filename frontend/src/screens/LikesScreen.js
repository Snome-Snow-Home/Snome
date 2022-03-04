import React, { useEffect, useContext, useState } from 'react';
import {

  Text,
  Image,
  ScrollView,
  Dimensions,

} from 'react-native';
import UserContext from '../Context/UserContext';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

// for testing purposes
import card from '../localtestdata/Projects.json';


const LikesScreen = () => {
  const [data, setData] = useState([])
  const context = useContext(UserContext)

  const getSnomeLikes = async () => {
    const user_id = context.user_data.user_id
    let response = await fetch('http://localhost:3000/like/navbar/' + user_id)
    console.log(response)
    let json = await response.json()
    setData(json)
    console.log("Here are your Snome's you've liked")
  }

  function getData() {
    console.log(data)
  }

  useEffect(() => {
    getSnomeLikes();
  }, [])

  return (
    <ScrollView>
      <Image style={styles.tinyLogo} source={require('../pics/Snome.png')} />

      {/* <Text> Snome Likes </Text>
      <Button title="Get data" onPress={getData}>Get Data</Button>
      {card.map((card) => (
        <View
          className="container"
          id="cards"
          key={card.id}
          style={styles.cards}
        >
          <Text>{card.name}</Text>
          <Image style={styles.pic} source={require('../pics/Snome.png')} />
          <Text> {card.description}</Text>

          {/* <Button href={card.deployed} target="_blank">
                  View Snome ETC.
                </Button> */}
      {/* <Button
            //  onPress={() =>
            //   navigation.navigate('Match')
            // }
            title="  View Snome ETC."
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      ))}  */}
      {data ? data.map((item, index) => (

        // <Text key={index}>{item.header}</Text>
        <Card style={styles.container} key={index}>
          <Card.Title title="Card Title" subtitle="Card Subtitle"
          //left={item.header} 
          />
          <Card.Content>
            <Title>{item.header}</Title>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.url[0] }} />
          <Card.Actions>
            {/* //need functionality for this to be unliked */}
            <Button>Unlike</Button>

          </Card.Actions>
        </Card>
      )) : <Text>You don't have any liked Snome's...GO check some out!</Text>}
    </ScrollView>
  );
};

const styles = {
  cards: {
    width: Dimensions.get('window').width * 0.4,
    height: 450,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 3,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    width: Dimensions.get('window').width * 0.4,
    height: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 3,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,
    margin: 20



  }
  //   pic:{
  //     width:Dimensions.get('window').width * 0.4,
  //     height:Dimensions.get('window').height * 0.2,
  //  },
};
export default LikesScreen;
