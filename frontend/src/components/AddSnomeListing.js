import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Input, Layout, Datepicker, Icon, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import UserContext from '../Context/UserContext';
import axios from 'axios'
import PhotoPicker from './PhotoPicker';

function AddSnomeListing() {
    const navigation = useNavigation();
    const context = useContext(UserContext)
    const owner_id = context.user_data.user_id;

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [location_id, setLocationIdTwo] = useState('')
    const [locationId, setLocationId] = useState([])
    const [snome_id, setSnome_id] = useState(null)
    const [snome, setSnome] = useState({
        owner_id: owner_id,
        //this needs to be changed from hardcoded eventually
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

    useEffect(() => {
        getListingIds()
    }, []);

    const data = locationId.map((locationId) =>
        <SelectItem key={locationId.id} title={locationId.name} />);
    const displayValue = data[selectedIndex.row];
    // console.log(data);

    // function grabData() {
    //     console.log(displayValue)
    //     console.log(displayValue.key)
    //     const location_id = displayValue.key
    //     setLocationIdTwo(location_id)
    //     console.log(location_id)
    // }
    const getListingIds = async () => {
        try {
            const response = await fetch('http://LOCALHOST:3000/location');
            const locationId = await response.json()
            // console.log(locationId)
            //console.log(locationId[0].id)
            setLocationId(locationId)
        } catch (error) {
            console.error(error);
        }
    }

    // post request to add snome listing to database
    const addListing = async () => {
        const location_id = displayValue.key
        setLocationIdTwo(location_id)
        try {
            axios.post('http://LOCALHOST:3000/snome/' + owner_id + '/' + location_id, snome)
                .then(console.log("you did it"))
                .then(console.log(owner_id))
                .then(console.log(snome))
                .then((res) => {
                    console.log(res.data.snome_id.id)
                    setSnome_id(res.data.snome_id.id)
                })
        }
        catch (error) {
            console.error("Snome listing not able to be added", error);
        }
    }
    console.log(snome_id)

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <PhotoPicker snome_id={snome_id} />
                <Layout style={styles.rowContainer} level='1'>
                    <Select
                        label='Select Your Location'
                        selectedIndex={selectedIndex}
                        value={displayValue}
                        onSelect={(index) => setSelectedIndex(index)}>
                        {/* onSelect={locationId => setLocationId(locationId)}> */}
                        {locationId && locationId.map((locationId) => (<SelectItem key={locationId.id} title={locationId.name} />
                        ))}
                    </Select>
                </Layout>
                <Layout style={styles.rowContainer} level='1'>
                    <Datepicker
                        label='Availability start'
                        //caption='Caption'
                        //placeholder='Pick Date'
                        date={availability_start}
                        style={styles.container}
                        onSelect={(value) => handleOnChangeText(value, 'availability_start')}
                    // accessoryRight={CalendarIcon}
                    />
                    <Datepicker
                        label='Availability end'
                        //caption='Caption'
                        //placeholder='Pick Date'
                        date={availability_end}
                        style={styles.container}
                        onSelect={(value) => handleOnChangeText(value, 'availability_end')}
                    // accessoryRight={CalendarIcon}
                    />
                </Layout>

                <Layout style={styles.rowContainerTwo} level='1'>
                    <Input
                        type="text"
                        label="Bedrooms"
                        id="bedrooms"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={bedrooms}
                        onChangeText={(value) => handleOnChangeText(value, 'bedrooms')}
                        style={styles.input}
                    />
                    <Input
                        type="text"
                        label="Bathrooms"
                        id="bathrooms"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={bathrooms}
                        onChangeText={(value) => handleOnChangeText(value, 'bathrooms')}
                        style={styles.input}
                    />
                    <Input
                        type="text"
                        label="# Guests "
                        id="number_of_beds"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={number_of_beds}
                        onChangeText={(value) => handleOnChangeText(value, 'number_of_beds')}
                        style={styles.input}
                    />
                </Layout>
                <Layout style={styles.rowContainerOne}>
                    <Input
                        type="text"
                        id="header"
                        label='Header'
                        placeholder="Two Bedroom Luxury Condo with Hot Tub"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={header}
                        onChangeText={(value) => handleOnChangeText(value, 'header')}
                    />
                    <Input
                        type="text"
                        label="Description"
                        id="description"
                        autoCapitalize='none'
                        multiline={true}
                        autoCorrect={false}
                        value={description}
                        onChangeText={(value) => handleOnChangeText(value, 'description')}

                    />
                    <Input
                        type="text"
                        label="Ammenities"
                        id="perks"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={perks}
                        onChangeText={(value) => handleOnChangeText(value, 'perks')}
                    />
                    <Input
                        type="text"
                        label="Time To Mountain"
                        id="time_to_mountain"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={time_to_mountain}
                        onChangeText={(value) => handleOnChangeText(value, 'time_to_mountain')}
                    />
                    <Input
                        type="text"
                        label="Moutain Access"
                        id="mountain_access"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={mountain_access}
                        onChangeText={(value) => handleOnChangeText(value, 'mountain_access')}
                    />
                </Layout>
                <Layout style={styles.rowContainerOne}>
                    <Input
                        type="text"
                        label="Address"
                        id="address"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={address}
                        onChangeText={(value) => handleOnChangeText(value, 'address')}
                    />
                </Layout>

                <Button
                    title='Submit Snome'
                    onPress={addListing}
                    onPressOut={() => navigation.navigate('Home')}
                >Submit
                </Button>
            </View>
        </ScrollView >
    )
};

{/* drop down menu --> checkbox, <option> 1</option>
            <option> 2</option>
            <option> 3</option>  --- onPress={(location_id) => setLocation_id(3)} */}


{/* <Input

                    type="text"
                    label="Starting availability"
                    id="availability_start"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={availability_start}
                    onChangeText={(value) => handleOnChangeText(value, 'availability_start')}
                    style={styles.input}
                /> */}
{/* <Input

                    type="text"
                    label="Ending availibility"
                    id="availability_end"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={availability_end}
                    onChangeText={(value) => handleOnChangeText(value, 'availability_end')}
                    style={styles.input}
                /> */}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "white",
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 2
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 5
    },
    rowContainerOne: {
        justifyContent: 'space-between',
        margin: 5
    },
    rowContainerTwo: {
        flexDirection: 'row',
        // justifyContent: 'space-',
        //alignItems: 'center',
        margin: 5
    },
    input: {
        flex: 1,
        margin: 5,
    },
    container: {
        maxHeight: 200,
        maxWidth: 200
    }
})
export default AddSnomeListing
