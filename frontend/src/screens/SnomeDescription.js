import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.6;

function SnomeDescription({ route }) {
  const [images, setData] = useState([]);

  const getImageUrl = async () => {
    console.log(route);
    try {
      const response = await fetch('http://10.0.0.53:3000/snome/' + route.params.snome_id + '/photos');
      const json = await response.json();
      setData(json.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageUrl();
  }, []);


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

  return (
    <ScrollView>
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
});

export default SnomeDescription;

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Button,
//     ImageBackground,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     Dimensions,
// } from 'react-native';
// import { useWindowDimensions } from 'react-native';
// import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
// import Photoslider from '../components/Photoslider';

// const photo = {
//     uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
//     uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
//     uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
//     uri: 'https://snome.s3.us-east-2.amazonaws.com/langham_news_2.jpg',
// };

// const SnomeDescription = () => {

//     const [photo, setData] = useState([]);

//     const getPhotos = async () => {
//         try {
//             const response = await fetch('http://10.0.0.53:3000/snome/10/photos');
//             const json = await response.json();
//             setData(json);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getPhotos();
//     }, []);

//     return (
//         <>
//             <ScrollView
//                 style={styles.scrollView}
//                 contentContainerStyle={styles.contentContainer}
//             >
//                 <Text style={styles.text}>Snome</Text>

//                 {/* <Photoslider style={styles.slider} photos={photo} /> */}

//                 <Button style={styles.button} onPress={isLiked}>  Like</Button>
//                 <Text
//                     style={styles.text}
//                 >
//                     Gorgeous 2 bedroom with views
//                 </Text>

//                 <View style={styles.descriptionContainer}>
//                     <Text style={styles.descriptionTextHeaders}>
//                         4.75&nbsp;&nbsp;
//                         <FontAwesome name="star" size={20} color="black" />
//                         <FontAwesome name="star" size={20} color="black" />
//                         <FontAwesome name="star" size={20} color="black" />
//                         <FontAwesome name="star" size={20} color="black" />
//                         <FontAwesome name="star-half" size={20} color="black" />
//                     </Text>
//                     <Text style={styles.descriptionTextHeaders}>
//                         Availability{'\n'}
//                         <Text style={{ fontWeight: 'normal' }}>Dec – April</Text>
//                     </Text>

//                     <Text style={styles.descriptionTextHeaders}>
//                         Rooms{'\n'}
//                         <Text style={{ fontWeight: 'normal' }}>2 beds 1 bath</Text>
//                     </Text>
//                     <Text style={styles.descriptionTextHeaders}>
//                         Mountain Access{'\n'}
//                         <Text style={{ fontWeight: 'normal' }}>8 mins Ski-in</Text>
//                     </Text>
//                 </View>
//             </ScrollView >
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     scrollView: {
//         height: '100%',
//         backgroundColor: 'white',
//     },
//     contentContainer: {
//         margin: 25,
//         marginTop: 55,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//     },
//     photoContainer: {
//         marginTop: 20,
//         backgroundColor: 'white',
//         borderWidth: 1,
//         borderColor: 'black',
//         flex: 1,
//         height: Dimensions.get('window').height * 0.3,
//         width: Dimensions.get('window').height * 0.4,
//     },
//     // photoGallery: {
//     //   flex: 1,
//     //   flexDirection: "row",
//     //   alignItems: "center",
//     //   height: 250,
//     //   width: "100%",
//     //   backgroundColor: "white",
//     //   borderTopWidth: 1,
//     //   borderColor: "black",
//     // },

//     descriptionContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         alignContent: 'space-around',
//         height: 125,
//         width: '100%',
//         backgroundColor: 'white',
//     },
//     descriptionTextHeaders: {
//         fontSize: 17,
//         width: '50%',
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: 40,
//         fontWeight: 'bold',
//         paddingTop: 20,
//         paddingBottom: 20,
//         textAlign: 'center',
//     },
//     slider: {
//         height: 250,
//         width: 300,
//     },
//     button: {
//         backgroundColor: '#00BFFF',
//         borderRadius: 10,
//         width: 200,
//         height: 150,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//     }

// });
