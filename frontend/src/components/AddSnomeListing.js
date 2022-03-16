import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

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
    //post request to add snome listing to database
    // const addListing = async () => {
    //  const response = axios.post('./snome', req.body)
    // }

    return (
        <ScrollView>
            <TextInput
                mode="flat" />
        </ScrollView>
    )
}

export default AddSnomeListing
