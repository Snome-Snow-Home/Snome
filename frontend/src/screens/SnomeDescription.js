import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get('window');
const height = width * 0.6;

function SnomeDescription({ route }) {
  const context = useContext(UserContext);
  const setTracker = context.setTracker
  const [images, setUrl] = useState([]);
  const [description, setDesc] = useState([]);
  const [title, setTitle] = useState([]);
  const [address, setAddress] = useState([]);
  const [bedsNumber, setBedsNumb] = useState([]);
  const [error, setError] = useState('');

  const getData = async () => {
    const snome_id = route.params.snome_id;
    try {
      const response = await fetch(
        'http://localhost:3000/snome/description/' + snome_id
      );
      const json = await response.json();
      setUrl(json.url);
      setDesc(json.description);
      setTitle(json.header);
      setAddress(json.address);
      setBedsNumb(json.number_of_beds)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [context.stateTracker]);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 5500);
  };

  const [active, setActive] = useState([0]);

  let change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    console.log(slide);
    if (slide !== active) {
      setActive(slide);
    }
  };

  //get request to db to see if like already exists with current user
  const checkLikes = async (snome_id) => {
    const likeObj = {
      snome_user_id: context.user_data.user_id,
      snome_id: snome_id,
    };
    try {
      const checkLikes = await fetch(
        'http://localhost:3000/snome/like/exists/' +
          likeObj.snome_id +
          '/' +
          likeObj.snome_user_id
      );
      const likeStatus = await checkLikes.json();
      console.log(likeStatus);
      return likeStatus.case;
    } catch (error) {
      console.error(error);
    }
  };

  //post request to the db to add this listing to users likes
  const addToLikes = async () => {
    const snome_id = route.params.snome_id;
    const status = {
      likes: await checkLikes(snome_id),
    };

    if (status.likes) {
      return updateError('You have already liked this Snome', setError);
    } else {
      //console.log(context)
      const likeObj = {
        snome_user_id: context.user_data.user_id,
        snome_id: snome_id,
      };
      axios
        .post(
          'http://localhost:3000/snome/like/' +
            likeObj.snome_id +
            '/' +
            likeObj.snome_user_id,
          {}
        )
        .catch((error) => {
          console.error(error);
          console.log('Snome not able to be added to snome_like ', error);
        });
      setTracker(null)
    }
  };

  return (
    <ScrollView>
      {error ? <Text style={style.invalidInput}>{error}</Text> : null}
      <View style={style.container}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={change}
          scrollEventThrottle={150}
          style={style.scroll}
        >
          {images.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={style.image} />
          ))}
        </ScrollView>
        <View style={style.pagination}>
          {images.map((i, j) => (
            <Text
              key={j}
              style={j == active ? style.pagingActiveText : style.pagingText}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
      <Card style={style.card}>
        <Title>
          <Text>{title}</Text>
        </Title>
        <Card.Content>
          <Paragraph>Snome Desscreption: {description}</Paragraph>
          <Text>Address: {address}</Text>
          <Text>Number of Beds: {bedsNumber}</Text>
        </Card.Content>
      </Card>
      <View style={style.view}>
        <Button style={style.button} onPress={() => addToLikes()}>
          <Text>Like This Snome</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: { marginTop: 50, width, height },
  scroll: { width, height },
  image: { width, height, resizeMode: 'cover' },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: { fontSize: width / 30, color: '#888', margin: 3 },
  pagingActiveText: { fontSize: width / 30, color: '#fff', margin: 3 },
  view: { marginTop: 50, marginBottom: 50 },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#448EB1',
    color: 'white',
    fontFamily: 'Arial',
    width: Dimensions.get('window').width * 0.4,
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 20,
  },
  invalidInput: {
    color: 'red',
    backgroundColor: 'lightgray',
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    width: '95%',
  },
  card: {marginTop: 50, width, height: width * 0.18}
});

export default SnomeDescription;
