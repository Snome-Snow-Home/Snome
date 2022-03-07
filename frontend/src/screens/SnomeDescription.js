import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import UserContext from '../Context/UserContext';
import axios from 'axios';

const { width } = Dimensions.get('window');
const height = width * 0.6;

function SnomeDescription({ route }) {
  const context = useContext(UserContext);
  const [images, setData] = useState([]);
  const [error, setError] = useState('');

  const getImageUrl = async () => {
    console.log(route);
    try {
      const response = await fetch(
        'http://localhost:3000/snome/' + route.params.snome_id + '/photos'
      );
      const json = await response.json();
      setData(json.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageUrl();
  }, []);

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
  const addToLikes = async (snome_id = route.params.snome_id) => {
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
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
});

export default SnomeDescription;
