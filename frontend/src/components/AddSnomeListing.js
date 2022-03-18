import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Input, Layout, Datepicker, Icon } from '@ui-kitten/components';
import UserContext from '../Context/UserContext';
import axios from 'axios'

function AddSnomeListing() {
    const navigation = useNavigation();
    const context = useContext(UserContext)
    const owner_id = context.user_data.user_id;

    const [snome, setSnome] = useState({
        owner_id: owner_id,
        location_id: '', //this needs to be changed from hardcoded eventually
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

    // const CalendarIcon = (props) => (
    //     <Icon {...props} name='calender' />
    // );

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
            <View style={styles.formContainer}>
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
                        label="TTM"
                        id="time_to_mountain"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={time_to_mountain}
                        onChangeText={(value) => handleOnChangeText(value, 'time_to_mountain')}
                    //style={styles.formInput}
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

                {/* <Layout style={styles.rowContainer} level='4'> */}
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
                {/* </Layout> */}
                <Layout style={styles.rowContainer} level='1'>
                    <Datepicker
                        label='Availability start'
                        //caption='Caption'
                        //placeholder='Pick Date'
                        date={availability_start}
                        onSelect={(value) => handleOnChangeText(value, 'availability_start')}
                    // accessoryRight={CalendarIcon}
                    />
                    <Datepicker
                        label='Availability end'
                        //caption='Caption'
                        //placeholder='Pick Date'
                        date={availability_end}
                        onSelect={(value) => handleOnChangeText(value, 'availability_end')}
                    // accessoryRight={CalendarIcon}
                    />
                </Layout>
                <Input

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
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    formInput: {
        margin: 5,
        padding: 2
    },
    formContainer: {
        backgroundColor: "white",
        borderSyle: 'solid',
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
    input: {
        flex: 1,
        margin: 5,
    },
    container: {
        minHeight: 360,
    }
})
export default AddSnomeListing
