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
//             const response = await fetch('http://localhost:3000/snome/10/photos');
//             const json = await response.json();
//             setData(json);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getPhotos();
//     }, []);

//     const isLiked = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/snome/:id/like', {
//                 method: 'POST',
//             });
//             const json = await response.json();
//             console.log(json);
//         } catch (error) {
//             console.error(error);
//         }
//     };

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

// export default SnomeDescription;
