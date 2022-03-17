import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/UserContext';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';

const DropdownItem = ({ title, setQuery, showDropdown, setShowDropdown }) => (
  <View style={styles.item}>
    <Text
      onPress={() => (
        showDropdown === 'hide'
          ? setShowDropdown('show')
          : setShowDropdown('hide'),
        setQuery(title)
      )}
      style={styles.title}
    >
      {title}
    </Text>
  </View>
);

const NewSearch = ({ locationData }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState('show');

  const renderItem = ({ item }) => {
    let search = query.toLowerCase().replace(/ /g, '_');
    if (query === '') {
      return null;
    }
    if (item.toLowerCase().startsWith(search)) {
      return (
        <DropdownItem
          title={item}
          setQuery={setQuery}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      );
    }
  };

  return (
    <>
      <View style={{ width: '100%' }}>
        <TextInput
          clearButtonMode="while-editing"
          style={styles.input}
          onChangeText={setQuery}
          value={query}
        />
        <Text>{showDropdown}</Text>

        {showDropdown === 'show' && (
          <FlatList
            style={{ position: 'absolute', top: 40, width: '100%' }}
            data={locationData.map((location) => location.name)}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        )}
      </View>
    </>
  );
};

const ShowList = ({
  label,
  values,
  selectedValue,
  setSelectedValue,
  toggleOptions,
  locationData,
}) => {

  const context = useContext(UserContext);
  const stateTracker = context.stateTracker;
  const setTracker = context.setTracker

  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.row, styles.ListMapContainer]}>
          {locationData.map((location) => (
            <TouchableOpacity
              key={location.name}
              onPress={() => {
                setTracker(location.location_id)
                setSelectedValue(location.name);
                navigation.navigate('Listing', {
                  location_id: location.location_id,
                });
              }}
              style={[
                styles.location,
                selectedValue === location.name && styles.selected,
              ]}
            >
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={{ uri: location.url }}
              />
              <Text
                style={[
                  styles.buttonLabel,
                  selectedValue === location.name && styles.selectedLabel,
                ]}
              >
                {location.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const ShowMap = ({ label, locationData }) => {
  // console.log(locationData);
  // console.log(data)

  if (Device.brand == 'Apple') {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.ListMapContainer}>
          <View
            style={{
              backgroundColor: 'oldlace',
              width: '100%',
              height: '100%',
              padding: 16,
            }}
          >
            <MapView style={styles.map}>
              {locationData.map((location, index) => (
                <Marker
                  key={index}
                  //NOTE: LAT AND LONG ARE BACKWARDS
                  coordinate={{
                    latitude: location.longitude,
                    longitude: location.latitude,
                  }}
                />
              ))}
            </MapView>
          </View>
        </View>
      </>
    );
  } else if (Device.brand == null) {
    return (
      <>
        <Text>Map feature is not compatible on web browsers</Text>
      </>
    );
  } else {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.ListMapContainer}>
          <View
            style={{
              backgroundColor: 'oldlace',
              width: '100%',
              height: '100%',
              padding: 16,
            }}
          >
            <MapView
              style={styles.map}
              region={{
                latitude: 37.0902,
                longitude: -95.712,
                latitudeDelta: 50,
                longitudeDelta: 30,
              }}
            >
              {locationData.map((location, index) => (
                <Marker
                  key={index}
                  //NOTE: LAT AND LONG ARE BACKWARDS
                  coordinate={{
                    latitude: location.longitude,
                    longitude: location.latitude,
                  }}
                />
              ))}
            </MapView>
          </View>
        </View>
      </>
    );
  }
};

const FeaturedLocations = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  toggleOptions,
  view,
  setView,
  filterNames,
  locationData,
}) => {
  return (
    <View style={{ padding: 10, flex: 1, position: 'relative' }}>
      {/* Top Container */}
      <View style={[styles.topContainer, { [label]: selectedValue }]}>
        {children}
        <View>
          {/* <Text style={styles.SnomeLogo}>Snome Logo</Text> */}
          <Image
            source={require('../../assets/Snome.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>

        {/* Search Box Container */}
        <View
          style={{
            padding: 12,
            width: '80%',
            backgroundColor: '',
            alignSelf: 'center',
            position: 'relative',
            zIndex: 99,
          }}
        >
          <Text style={{ marginLeft: 12, marginBottom: 4 }}>
            Choose your destination
          </Text>

          <NewSearch locationData={locationData} />
        </View>

        <View styles={{ position: 'absolute', zIndex: -1 }}>
          {/* Toggle For List Map View */}
          <View style={[styles.row, {}]}>
            {toggleOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setView(option)}
                style={[styles.toggle]}
              >
                <Text style={[styles.buttonLabel]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* End of Top Container */}

        {view === 'ShowList' && (
          <ShowList
            label={label}
            values={values}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            locationData={locationData}
          ></ShowList>
        )}

        {view === 'ShowMap' && (
          <ShowMap
            label={label}
            values={values}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            locationData={locationData}
          ></ShowMap>
        )}
      </View>

      {/* Bottom Container */}
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
        <Text>Bottom Container</Text>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [flexDirection, setflexDirection] = useState('column');
  const [toggleView, settoggleView] = useState('ShowList');
  const [data, setData] = useState([]);

  const getLocations = async () => {
    try {
      const response = await fetch('http://localhost:3000/featured_location');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const filterNames = (location) => {
    let search = query.toLowerCase().replace(/ /g, '_');
    if (location.name.toLowerCase().startsWith(search)) {
      return <Text style={{ height: 40 }}>{location.name}</Text>;
    } else {
      return null;
    }
  };

  return (
    <FeaturedLocations
      label="flexDirection"
      values={data.map((location) => location.name)}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
      toggleOptions={['ShowList', 'ShowMap']}
      view={toggleView}
      setView={settoggleView}
      filterNames={filterNames}
      locationData={data}
    ></FeaturedLocations>
  );
};

const styles = StyleSheet.create({
  // mapcontainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  map: {
    width: '100%',
    height: '100%',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },

  item: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    // fontSize: 22,
    // alignSelf:'center'
  },

  ListMapContainer: {
    height: Dimensions.get('window').width * 0.8 + 32,
    // backgroundColor: "red"
  },
  toggle: {
    backgroundColor: 'oldlace',
    padding: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    // marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    // maxWidth: '80%'
  },
  SnomeLogo: {
    padding: 18,
    backgroundColor: 'powderblue',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  topContainer: {
    // flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    // flex:1,
    zIndex: -1,
    elevation: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  location: {
    borderRadius: 4,
    backgroundColor: 'oldlace',
    marginBottom: 16,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default HomeScreen;
