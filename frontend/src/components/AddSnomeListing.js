import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Input } from '@ui-kitten/components';
import UserContext from '../Context/UserContext';
import axios from 'axios'

function AddSnomeListing() {
    const navigation = useNavigation();
    const context = useContext(UserContext)
    const owner_id = context.user_data.user_id;

    const [snome, setSnome] = useState({
        owner_id: owner_id,
        location_id: 1, //this needs to be changed from hardcoded eventually
        header: '',
        time_to_mountain: '',
        mountain_access: '',
        availability_start: '',
        availability_end: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        number_of_beds: '',
        perks: '',
        description: ''
    })

    const {

        location_id,
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        description
    } = snome

    const handleOnChangeText = (value, fieldName) => {
        setSnome({ ...snome, [fieldName]: value });
    };

    // post request to add snome listing to database
    const addListing = async () => {

        const response = axios.post('http://localhost:3000/snome/' + owner_id, snome)
            .then(console.log("you did it"))
            .catch(error => {
                console.error(error);
                console.log('Snome listing not able to be added', error)
            })
    }

    return (
        <ScrollView>
            <View >
                <Input
                    mode="outlined"
                    type="text"
                    id="header"
                    label='Header'
                    placeholder="Two Bedroom Luxury Condo with Hot Tub"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={header}
                    left={<TextInput.Affix text="/100" />}
                    onChangeText={(value) => handleOnChangeText(value, 'header')}
                // style={styles.formInput}
                />
                <Input
                    mode="flat"
                    type="text"
                    label="Time to Resort Village"
                    id="time_to_mountain"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={time_to_mountain}
                    onChangeText={(value) => handleOnChangeText(value, 'time_to_mountain')}
                    style={styles.formInput}
                />
                <Input
                    mode="flat"
                    type="text"
                    label="Moutain Access"
                    id="mountain_access"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={mountain_access}
                    onChangeText={(value) => handleOnChangeText(value, 'mountain_access')}
                    style={styles.formInput}
                />
            </View>
            <Input
                mode="flat"
                type="text"
                label="Starting availability"
                id="availability_start"
                autoCapitalize='none'
                autoCorrect={false}
                value={availability_start}
                onChangeText={(value) => handleOnChangeText(value, 'availability_start')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="Ending availibility"
                id="availability_end"
                autoCapitalize='none'
                autoCorrect={false}
                value={availability_end}
                onChangeText={(value) => handleOnChangeText(value, 'availability_end')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="Address"
                id="address"
                autoCapitalize='none'
                autoCorrect={false}
                value={address}
                onChangeText={(value) => handleOnChangeText(value, 'address')}
                style={styles.formInput}
            />

            {/* drop down menu --> checkbox, <option> 1</option>
            <option> 2</option>
            <option> 3</option>  --- onPress={(location_id) => setLocation_id(3)} */}

            <Input
                mode="flat"
                type="text"
                label="Bedrooms"
                id="bedrooms"
                autoCapitalize='none'
                autoCorrect={false}
                value={bedrooms}
                onChangeText={(value) => handleOnChangeText(value, 'bedrooms')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="Bathrooms"
                id="bathrooms"
                autoCapitalize='none'
                autoCorrect={false}
                value={bathrooms}
                onChangeText={(value) => handleOnChangeText(value, 'bathrooms')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="# of beds"
                id="number_of_beds"
                autoCapitalize='none'
                autoCorrect={false}
                value={number_of_beds}
                onChangeText={(value) => handleOnChangeText(value, 'number_of_beds')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="Ammenities"
                id="perks"
                autoCapitalize='none'
                autoCorrect={false}
                value={perks}
                onChangeText={(value) => handleOnChangeText(value, 'perks')}
                style={styles.formInput}
            />
            <Input
                mode="flat"
                type="text"
                label="Description"
                id="description"
                autoCapitalize='none'
                autoCorrect={false}
                value={description}
                onChangeText={(value) => handleOnChangeText(value, 'description')}
                style={styles.formInput}
            />
            <Button
                title='Submit Snome'
                onPress={addListing}
                onPressOut={() => navigation.navigate('Home')}
            >Submit
            </Button>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    formInput: {
        margin: 5,
        padding: 2
    },
    label: {
        margin: 5,
        color: '#464545',
        fontFamily: 'Arial',
    },
    required: {
        margin: 5,
        color: 'gray',
        fontFamily: 'Arial',
        fontSize: 14,
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputForm: {
        color: 'black',
        backgroundColor: 'lightblue',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        padding: 8,
        width: '100%',
    },
})
export default AddSnomeListing
