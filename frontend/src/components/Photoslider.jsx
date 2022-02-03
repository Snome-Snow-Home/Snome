import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    useWindowDimensions,
    direction
} from 'react-native';

export default function Slider(props) {
    const {
        id,
        index,
        onChange,
        photos,
        onPress,
        onLongPress,
        onScroll,
        onScrollBeginDrag,
        onScrollEndDrag,
        scrollEventThrottle,
        showsHorizontalScrollIndicator,
        ...passThroughProps //does spreading other props remoev them from passThru?
    } = props

    const [currentIndex, setCurrentIndex] = useState(index);
   
    return (

        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={scrollEventThrottle}
                contentContainerStyle={styles.contentContainer}
            >
                {photos.map((photo, index) => (
                    <Image

                        key={index}
                        source={{ uri: photo }}
                        style={styles.image}
                    />
                ))}
            </ScrollView>
        </View>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

