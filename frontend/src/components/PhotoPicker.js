import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';




function PhotoPicker() {
    const [image, setImage] = useState(null);

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert("Permission Denied")
            }
        }
    }, [])

    const addPhoto = async () => {
        //const uriToString = image.toString()

        //   console.log(image)
        //console.log(image.data)
        // const imagePath = image;
        const imageExt = image.split('.').pop();
        const imageMime = `image/${imageExt}`;
        // let picture = await fetch(imagePath);
        // picture = await picture.blob();
        // const imageData = new File([picture], `photo.${imageExt}`);
        // // console.log(imageData)
        // console.log(imageData.name)

        const snome_id = 6
        await fetch('http://localhost:3000/photos/' + snome_id, {
            method: 'POST',
            //we need something beginning with data:
            body: image,
            headers: {
                "Content-Type": imageMime
            }
        });

        // try {
        //     axios.post('http://localhost:3000/photos/' + snome_id, {})
        //         .then(console.log(snome_id))
        // } catch (error) {
        //     console.error(error);
        // }
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {

            setImage(result.uri);
            console.log(result.uri)
        }
    };

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Add image from Gallery" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="addphoto" onPress={addPhoto}>Save Photo</Button>
        </View>
    );
}

export default PhotoPicker
