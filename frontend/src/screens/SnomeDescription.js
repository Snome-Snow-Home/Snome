import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

const image = {
  uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
};

const SnomeDescription = () => {
  const [photos, setData] = useState([]);

  const window = useWindowDimensions();

  var i = 0;

  const scrollPhotoLeft = () => {
    i -= 1;

    console.log(photos[i]);
  };
  const scrollPhotoRight = () => {
    if (i >= photos.length - 1) {
      return (i = -1);
    }
    i += 1;
    console.log(i);
    console.log(photos[i]);
  };

  const getPhotos = async () => {
    try {
      const response = await fetch('http://localhost:3000/snome/10/photos');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  // let i = 0;

  // console.log(photos[i]);

  const createLike = () => {
    console.log('this worked too');
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <AntDesign
        name="leftcircleo"
        size={34}
        color="black"
        style={{ alignSelf: 'flex-start', marginTop: 10 }}
      />
      <View style={styles.photoContainer}>
        {/* <View style={styles.photoGallery}> */}
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: 'center' }}
        ></ImageBackground>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <TouchableOpacity
            onPress={scrollPhotoLeft}
            style={{
              position: 'absolute',
            }}
          >
            <AntDesign name="left" size={34} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', margin: 330 }}>
            <AntDesign
              onPress={scrollPhotoRight}
              name="right"
              size={34}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              marginLeft: 300,
            }}
          >
            <Ionicons
              onPress={createLike}
              name="heart-circle-outline"
              size={64}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          width: '100%',
          fontSize: 25,
          paddingTop: 7,
          textAlign: 'left',
        }}
      >
        Gorgeous 2 bedroom with views
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTextHeaders}>
          4.75&nbsp;&nbsp;
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome name="star-half" size={20} color="black" />
        </Text>
        <Text style={styles.descriptionTextHeaders}>
          Availability{'\n'}
          <Text style={{ fontWeight: 'normal' }}>Dec – April</Text>
        </Text>

        <Text style={styles.descriptionTextHeaders}>
          Rooms{'\n'}
          <Text style={{ fontWeight: 'normal' }}>2 beds 1 bath</Text>
        </Text>
        <Text style={styles.descriptionTextHeaders}>
          Mountain Access{'\n'}
          <Text style={{ fontWeight: 'normal' }}>8 mins Ski-in</Text>
        </Text>
      </View>
      <View style={styles.ownerContainer}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // SnomeLogo: {
  //   padding: 18,
  //   backgroundColor: "powderblue",
  //   alignSelf: "flex-start",
  //   marginLeft: 20,
  //   marginTop: 20,
  //   marginBottom: 60,
  // },
  scrollView: {
    height: '100%',
    backgroundColor: 'white',
  },
  contentContainer: {
    margin: 25,
    marginTop: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  photoContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    height: 250,
    width: '100%',
  },
  // photoGallery: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   height: 250,
  //   width: "100%",
  //   backgroundColor: "white",
  //   borderTopWidth: 1,
  //   borderColor: "black",
  // },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    height: 125,
    width: '100%',
    backgroundColor: 'white',
  },
  descriptionTextHeaders: {
    fontSize: 17,
    width: '50%',
    fontWeight: 'bold',
  },
  ownerContainer: {
    flex: 3,
    backgroundColor: 'yellow',
  },
});

export default SnomeDescription;
