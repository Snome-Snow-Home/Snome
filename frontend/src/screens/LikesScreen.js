import React, { useEffect, useContext, useState } from 'react';
import {
  View,
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

  const screenHeight = Dimensions.get('window').height

  return (
    <View style={{ height: screenHeight }}>
      <ScrollView>
        {/* <Image style={styles.tinyLogo} source={require('../pics/Snome.png')} /> */}
        <Text style={styles.title}>Snome's you LOVE</Text>
        {data ? data.map((item, index) => (
          <Card style={styles.container} key={index}>
            <Card.Title numberOfLines={3} title={item.header} subtitle={`Bedrooms: ${item.bedrooms}  Bathrooms: ${item.bathrooms}`} />
            <Title style={styles.header} subtitle={`Availability: ${item.availability_start} - ${item.availability_end}`} />
            <Card.Content>
              {/* <Title></Title> */}
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: item.url[0] }} />
            <Card.Actions>
              {/* //need functionality for this to be unliked */}
              <Button mode="outlined" icon="heart-off">Unlike</Button>

            </Card.Actions>
          </Card>
        )) : <Text>You don't have any liked Snome's...GO check some out!</Text>}
        {/* <Button onPress={getData} title="get data">Get Data</Button> */}
      </ScrollView>
    </View>
  );
};

const styles = {
  // cards: {
  //   width: 350,
  //   //width: Dimensions.get('window').width * 0.4,
  //   height: 450,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-evenly',
  //   flex: 3,
  //   border: '1px solid #ccc',
  //   borderRadius: '5px',
  //   padding: 5,
  // },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34393B',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textShadowColor: 'blue',
  },
  container: {
    //width: Dimensions.get('window').width * 0.4,
    width: 350,
    height: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    display: 'flex',
    backgroundColor: "#EFEDE4",
    //flex: 3,
    //border: '1px solid #ccc',
    borderRadius: 5,
    padding: 5,
    margin: 20,
    shadowColor: '#470000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    elevation: 2
  },
  // button: {
  //   border: '1px solid #630330'
  // }
  //   pic:{
  //     width:Dimensions.get('window').width * 0.4,
  //     height:Dimensions.get('window').height * 0.2,
  //  },
};
export default LikesScreen;
