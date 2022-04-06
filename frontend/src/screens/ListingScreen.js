import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
// for video player
// import YoutubePlayer from 'react-native-youtube-iframe';

// for testing purposes
// import location from '../localtestdata/Projects.json';

const { width } = Dimensions.get('window');
const height = width * 0.6;

function ListingScreen({ route }) {
  //const [flexDirection, setflexDirection] = useState('column');
  const [error, setError] = useState('');
  const [listing, setData] = useState([]);
  const [active, setActive] = useState([0]);
  const navigation = useNavigation();
  const context = useContext(UserContext);
  const setTracker = context.setTracker

  // fetch data from backend and set it to state
  const getListing = async () => {
    try {
      const response = await fetch(
        'http://LOCALHOST:3000/listing/' + route.params.location_id
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect is a hook that runs a piece of code based on a given condition
  useEffect(() => {
    getListing();
  }, [context.stateTracker]);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 5500);
  };

  //get request to db to see if like already exists with current user
  const checkLikes = async (snome_id) => {
    const likeObj = {
      snome_user_id: context.user_data.user_id,
      snome_id: snome_id,
    };
    try {
      const checkLikes = await fetch(
        'http://LOCALHOST:3000/snome/like/exists/' +
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
  const addToLikes = async (snome_id) => {
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
          'http://LOCALHOST:3000/snome/like/' +
          likeObj.snome_id +
          '/' +
          likeObj.snome_user_id,
          {}
        )
        .catch((error) => {
          console.error(error);
          console.log('Snome not able to be added to snome_like ', error);
        });
      setTracker(snome_id)
    }
  };

  let change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Listings</Text>
      {error ? <Text style={styles.invalidInput}>{error}</Text> : null}
      {listing.map((listing) => (
        <Card id="listing" style={styles.container} key={listing.snome_id}>
          <Title>
            <TouchableOpacity
              onPress={() => {
                setTracker(listing.snome_id)
                navigation.navigate('Description', {
                  snome_id: listing.snome_id,
                })
              }}
            >
              <Text style={{ margin: 15, marginTop: 20 }}>
                {listing.header}
              </Text>
            </TouchableOpacity>
          </Title>

          <Card.Content>
            <View style={styles.imageContainer}>
              <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={change}
                scrollEventThrottle={150}
                style={styles.scroll}
              >
                {listing.url.map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
              <View style={styles.pagination}>
                {listing.url.map((i, j) => (
                  <Text
                    key={j}
                    style={
                      j == active ? styles.pagingActiveText : styles.pagingText
                    }
                  >
                    ⬤
                  </Text>
                ))}
              </View>
            </View>
            <Paragraph>{listing.description}</Paragraph>
            <Card.Actions>
              <Button
                mode="outined"
                // style={styles.button}
                icon="heart-outline"
                onPress={() => { addToLikes(listing.snome_id) }}
              >
                <Text>I like this Snome!</Text>
              </Button>
            </Card.Actions>
          </Card.Content>
        </Card>
      ))}

      {/* {listing.map((listing) => (
        <React.Fragment key={listing.snome_id}>
          <View id="listing" style={styles.containerOne}>

            <TouchableOpacity onPress={() => navigation.navigate("Description", { snome_id: listing.snome_id })}>
              <Text style={{ margin: 15, marginTop: 20 }}>{listing.header}</Text>
            </TouchableOpacity>

            {listing.url.map((url, index) => (
              <React.Fragment key={index}>
                <Image style={styles.pic} source={{ uri: url }} />
              </React.Fragment>
            ))}
            <Text style={{ margin: 15, marginTop: 20 }}>
              {'\n'}
              {listing.description}
              {'\n'}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              title="I like this Snome!"
              onPress={() => addToLikes(listing.snome_id)}>
              <Text>I like this Snome! </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    display: 'flex',
    flex: 3,
    backgroundColor: '#EFEDE4',
    borderRadius: 5,
    padding: 5,
    margin: 20,
    shadowColor: '#470000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    elevation: 2,
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
  containerTwo: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    margin: 20,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  pic: {
    flex: 2,
    width: 300,
    height: 500,
    marginTop: 30,
    padding: 10,
    alignSelf: 'flex-start',
  },
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
  imageContainer: { marginTop: 50, width, height },
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
});

export default ListingScreen;
