import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';




function PhotoPicker() {
    const [photo, setPhoto] = useState(null);

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert("Permission Denied")
            }
        }
    }, [])

    const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
            name: 'photoone',
            type: photo.type,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };


    const addPhoto = async () => {
        //we need to change this to dynamic, after the snmoe has been created
        const snome_id = 6
        await fetch('http://localhost:3000/photos/' + snome_id, {
            method: 'POST',
            //we need something beginning with data:
            body: createFormData(photo),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

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

            setPhoto(result);
            console.log(result)
        }
    };

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Add image from Gallery" onPress={pickImage} />
            {photo && <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />}
            <Button title="addphoto" onPress={addPhoto}>Save Photo</Button>
        </View>
    );
}

export default PhotoPicker
