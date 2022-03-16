import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

function AddSnomeListing() {
    const navigation = useNavigation();

    const [snome, setSnome] = useState({
        // owner_id,
        //location_id,
        header: '',
        time_to_mountain: '',
        mountain_access: '',
        availability_start: '',
        availability_end: '',
        street_address: '',
        bedrooms: '',
        bathrooms: '',
        number_of_beds: '',
        perks: '',
        snome_description: ''
    })

    const {
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        street_address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        snome_description
    } = snome

    const handleOnChangeText = (value, fieldName) => {
        setUserData({ ...userData, [fieldName]: value });
    };

    //post request to add snome listing to database
    // const addListing = async () => {
    //  const response = axios.post('./snome', req.body)
    // }

    return (
        <ScrollView>
            <TextInput
                mode="flat"
                type="text"
                id="header"
                autoCapitalize='none'
                autoCorrect={false}
                value={header}
                onChangeText={(value) => handleOnChangeText(value, 'header')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="time_to_mountain"
                autoCapitalize='none'
                autoCorrect={false}
                value={time_to_mountain}
                onChangeText={(value) => handleOnChangeText(value, 'time_to_mountain')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="mountain_access"
                autoCapitalize='none'
                autoCorrect={false}
                value={mountain_access}
                onChangeText={(value) => handleOnChangeText(value, 'mountain_access')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="availability_start"
                autoCapitalize='none'
                autoCorrect={false}
                value={availability_start}
                onChangeText={(value) => handleOnChangeText(value, 'availability_start')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="availability_end"
                autoCapitalize='none'
                autoCorrect={false}
                value={availability_end}
                onChangeText={(value) => handleOnChangeText(value, 'availability_end')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="street_address"
                autoCapitalize='none'
                autoCorrect={false}
                value={street_address}
                onChangeText={(value) => handleOnChangeText(value, 'street_address')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id=""
                autoCapitalize='none'
                autoCorrect={false}
                value={ }
                onChangeText={(value) => handleOnChangeText(value, 'name')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="bedrooms"
                autoCapitalize='none'
                autoCorrect={false}
                value={bedrooms}
                onChangeText={(value) => handleOnChangeText(value, 'bedrooms')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="bathrooms"
                autoCapitalize='none'
                autoCorrect={false}
                value={bathrooms}
                onChangeText={(value) => handleOnChangeText(value, 'bathrooms')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="number_of_beds"
                autoCapitalize='none'
                autoCorrect={false}
                value={number_of_beds}
                onChangeText={(value) => handleOnChangeText(value, 'number_of_beds')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id=""
                autoCapitalize='none'
                autoCorrect={false}
                value={ }
                onChangeText={(value) => handleOnChangeText(value, 'name')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="perks"
                autoCapitalize='none'
                autoCorrect={false}
                value={perks}
                onChangeText={(value) => handleOnChangeText(value, 'perks')}
            // style={styles.formInput}
            />
            <TextInput
                mode="flat"
                type="text"
                id="snome_description"
                autoCapitalize='none'
                autoCorrect={false}
                value={snome_description}
                onChangeText={(value) => handleOnChangeText(value, 'snome_description')}
            // style={styles.formInput}
            />
        </ScrollView>
    )
}

export default AddSnomeListing
