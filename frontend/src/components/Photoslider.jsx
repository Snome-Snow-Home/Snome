import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
} from 'react-native';

export default function Slider(props) {
    const {
        id,
        type,
        label,
        hint,
        value,
        error,
        errorName,
        errorMessage,
        errorId,
        htmlFor,
        onChange,
        ...passThroughProps //does spreading other props remoev them from passThru?
    } = props

    const styles = StyleSheet.create({
        container: {
            flex: 1,    
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',

        },
        image: {
            width: 75,
            height: 75,
        },
        text: {
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
        },
        slider: {
            width: 100,
            height: 100,
        },

    });

    const [photos, setData] = useState([]);

    function scrollPhotos(direction) {
        if (direction === 'left') {
            setX(x + width);
        } else {
            setX(x - width);
        }
    }
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

    return (
        <View style={styles.slider}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
               scrollEventThrottle={scrollPhotos}
            >
                {photos.map((photo, index) => {

                    return (
                        <View key={index} style={styles.image}>
                            <Image
                                source={{ uri: photo.url }}
                                style={styles.image}
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};
